import type { UserError } from "@/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services";
import type { Auth } from "@/types/auth";

export default function useSignup() {
  const [insPass, setInsPass] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<Auth>>({});
  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const navigate = useNavigate();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleBack = () => {
    setInsPass(false);
    setForm({});
  };

  const hasInput = (key: keyof Auth) => {
    if (!form[key] || form[key] === "") return false;
    return true;
  };

  const correctFormat = (key: keyof Auth) => {
    if (!form[key]) return false;
    if (key === "email")
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form[key]);
    if (key === "pass") return !(form[key].length < 8);
  };

  const hasUser = async (key: keyof Auth) => {
    if (!form[key]) return "Missing Email";
    try {
      await service.auth.verifyValue(key, form[key]);
    } catch (err: any) {
      return err.message;
    }
  };

  const signUp = async (form: Auth) => {
    try {
      await service.auth.signUp(form);
    } catch (err: any) {
      return err.message;
    }
  };

  const handleNext = async () => {
    let err;
    setErrForm({});
    if (!hasInput("email")) {
      updateErrForm("email", "No Input");
      return;
    }

    if (!correctFormat("email")) {
      updateErrForm("email", "Incorrect Email Format");
      return;
    }

    err = await hasUser("email");
    if (err) {
      updateErrForm("email", err);
      return;
    }
    setInsPass(true);
  };

  const handleSignup = async () => {
    let err;
    setErrForm({});
    if (!hasInput("pass")) {
      updateErrForm("pass", "No Input");
      return;
    }

    if (!correctFormat("pass")) {
      updateErrForm("pass", "Password must be longer than 8 characters");
      return;
    }
    err = await signUp(form);
    if (err) {
      updateErrForm("pass", err);
      return;
    }

    navigate("/");
  };

  return {
    insPass,
    errForm,
    handleCancel,
    handleNext,
    updateForm,
    handleSignup,
    handleBack,
  };
}
