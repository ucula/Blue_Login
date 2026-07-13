import { PATHS } from "@/constants";
import { sendEmail } from "@/utility/sendEmail";
import type { LoginForm, LoginFormError } from "@/types/auth/auth";
import { hasInput } from "@/utility/form/checkInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useMain() {
  const [form, setForm] = useState<Partial<LoginForm>>({});
  const [errForm, setErrForm] = useState<Partial<LoginFormError>>({});
  const {
    mutate: sendMutate,
    isPending,
    isSuccess,
  } = sendEmail();
  const navigate = useNavigate();

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev: any) => ({ ...prev, [label]: value }));
  };

  const handleNext = () => {
    setErrForm({});
    if (!hasInput(["email"], form, updateErrForm)) {
      return;
    }
    sendMutate({ email: form.email || "", path: PATHS.RESET_VERIFY });
  };

  const handleCancel = () => {
    navigate(PATHS.ROOT);
  };

  return {
    form,
    errForm,
    isPending,
    isSuccess,
    handleCancel,
    handleNext,
    setForm,
  };
}
