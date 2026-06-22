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
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const hasInput = (key: keyof Auth) => {
    if (!form[key] || form[key] === "") return false;
    return true;
  };

  const correctFormat = (key: keyof Auth) => {
    if (!form[key]) return false;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form[key]);
  };

  const { mutateAsync: loginMutate } = service.auth.logIn();
  const { mutateAsync: verifyValueMutate } = service.auth.verifyValue();

  const hasUser = async (key: keyof Auth) => {
    try {
      await verifyValueMutate({ key, value: form[key] || "", label: "login" });
    } catch (err: any) {
      return err.message;
    }
  };

  const logIn = async (form: Auth) => {
    try {
      await loginMutate(form);
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

    if (!hasInput("pass")) {
      updateErrForm("pass", "No Input");
      return;
    }
    err = await logIn(form);
    if (err) {
      updateErrForm("pass", err);
      return;
    }
    navigate("/brief");
  };

  const handleforgot = () => {
    navigate("/reset-pass");
  };
  return { form, errForm, handleLogin, handleSignup, handleforgot, updateForm };
}
