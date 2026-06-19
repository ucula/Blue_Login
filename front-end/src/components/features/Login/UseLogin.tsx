import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserError } from "@/types/user";
import service from "@/services";
import type { Auth } from "@/types/auth";

export default function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Auth>>({});
  const [errForm, setErrForm] = useState<Partial<UserError>>({});

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const hasInput = (key: keyof Auth) => {
    if (!form[key] || form[key] === "") return false;
    return true;
  };

  const correctFormat = (key: keyof Auth) => {
    if (!form[key]) return false;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form[key]);
  };

  const hasUser = async (key: keyof Auth) => {
    if (!form[key]) return "Missing Email";
    try {
      await service.auth.verifyValue(key, form[key]);
    } catch (err: any) {
      return err.message;
    }
  };

  const logIn = async (form: Auth) => {
    if (!form) return "";
    try {
      await service.auth.logIn(form);
    } catch (err: any) {
      return err.message;
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    let err;
    setErrForm({});
    if (!hasInput("email")) {
      updateErrForm("email", "No Input");
      return;
    }
    if (!correctFormat("email")) {
      updateErrForm("email", "Wrong Email Format");
      return;
    }
    err = await hasUser("email");
    if (err) {
      updateErrForm("email", err);
      return;
    }

    if (!hasInput("pass")) return;
    err = await logIn(form);
    if (err) {
      updateErrForm("pass", err.message);
      return;
    }
  };

  const handleforgot = () => {
    navigate("/reset-pass");
  };
  return { form, errForm, handleLogin, handleSignup, handleforgot, updateForm };
}
