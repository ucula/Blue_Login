import service from "@/services";
import type { Auth } from "@/types/auth";
import type { UserError } from "@/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useReset() {
  const { mutate: reset } = service.auth.resetHandler();
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

  const handleNext = async () => {
    let err;
    setErrForm({});
    if (!hasInput("email")) return;
    if (!correctFormat("email")) return;

    err = await hasUser("email");
    if (err) {
      updateErrForm("email", err);
      return;
    }
    setInsPass(true);
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
