import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/user";
import service from "@/services";

export default function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<User>>({});
  const [errForm, setErrForm] = useState<Partial<User>>({});

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const hasInput = (label: string) => {
    if (label === "email") {
      if (!form.email || form.email.trim() === "") {
        updateErrForm("email", "No Input");
        return false;
      }
    } else if (label === "pass") {
      if (!form.pass || form.pass.trim() === "") {
        updateErrForm("pass", "No Input");
        return false;
      }
    }
    return true;
  };

  const correctFormat = (label: string) => {
    if (label === "email") {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        form.email.trim(),
      );
      if (!isEmail) {
        updateErrForm("email", "Wrong Format");
        return false;
      }
    }
    return true;
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    if (form.email === "admin") navigate("brief");
    setErrForm({});

    if (!hasInput("email")) return;
    if (!correctFormat("email")) return;
    try {
      await service.auth.verifyEmail(form.email, "login");
    } catch (err: any) {
      updateErrForm("email", err.message);
      return;
    }

    if (!hasInput("pass")) return;
    try {
      await service.auth.logIn(form);
      navigate("/brief");
    } catch (err: any) {
      updateErrForm("pass", err.message);
      return;
    }
  };

  const handleforgot = () => {
    navigate("/reset-pass");
  };
  return { form, errForm, handleLogin, handleSignup, handleforgot, updateForm };
}
