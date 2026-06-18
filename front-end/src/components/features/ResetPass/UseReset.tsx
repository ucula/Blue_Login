import service from "@/services";
import type { User, UserError } from "@/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useReset() {
  const { mutate: reset } = service.auth.resetHandler();
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
    if (!hasInput("email")) return;
    if (!correctFormat("email")) return;

    try {
      await service.auth.verifyEmail(form.email, "login");
      setInsPass(true);
    } catch (err: any) {
      updateErrForm("email", err.message);
      return;
    }
  };

  const handleReset = () => {
    setErrForm({});
    if (!hasInput("pass")) return;
    if (!correctFormat("pass")) return;

    reset(form, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (err: any) => {
        updateErrForm("pass", err.message);
        return;
      },
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleBack = () => {
    setInsPass(false);
    setForm({});
  };

  return {
    insPass,
    errForm,
    handleCancel,
    handleNext,
    updateForm,
    handleReset,
    handleBack,
  };
}
