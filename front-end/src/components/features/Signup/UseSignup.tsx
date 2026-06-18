import type { User, UserError } from "@/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services";

export default function useSignup() {
  const [insPass, setInsPass] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<User>>({});
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

  const hasInput = (input: string) => {
    if (!input || input.trim() === "") {
      return false;
    }
    return true;
  };

  const correctFormat = (label: string) => {
    if (label === "email") {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        form.email.trim(),
      );
    } else if (label === "pass") return form.pass.length >= 8;
  };

  const handleNext = async () => {
    setErrForm({});
    if (!hasInput(form.email)) {
      updateErrForm("email", "No Input");
      return;
    }

    if (!correctFormat("email")) {
      updateErrForm("email", "Incorrect Email Format");
      return;
    }

    try {
      await service.auth.verifyEmail(form.email, "signup");
      setInsPass(true);
    } catch (err: any) {
      updateErrForm("email", err.message);
      return;
    }
  };

  const handleSignup = async () => {
    setErrForm({});
    if (!hasInput(form.pass)) {
      updateErrForm("pass", "No Input");
      return;
    }

    if (!correctFormat("pass")) {
      updateErrForm("pass", "Password must be longer than 8 characters");
      return;
    }

    try {
      await service.auth.signUp(form);
      navigate("/");
    } catch (err: any) {
      updateErrForm("pass", err.message);
      return;
    }
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
