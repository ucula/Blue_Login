import { PATHS } from "@/config/path";
import service from "@/services";
import type { LoginForm, LoginFormError } from "@/types/auth/auth";
import { hasInput } from "@/utility/form/checkInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useMain() {
  const [form, setForm] = useState<Partial<LoginForm>>({});
  const [errForm, setErrForm] = useState<Partial<LoginFormError>>({});
  const { mutate: sendMutate, isPending } = service.auth.reset.sendEmail();
  const navigate = useNavigate();

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev: any) => ({ ...prev, [label]: value }));
  };

  const handleNext = () => {
    setErrForm({});
    if (!hasInput(["email"], form, updateErrForm)) {
      return;
    }

    sendMutate(form.email, {
      onSuccess: () => {
        navigate(PATHS.RESET_EMAIL_SENT, { state: form });
      },
    });
  };

  const handleCancel = () => {
    navigate(PATHS.ROOT);
  };

  return {
    form,
    errForm,
    isPending,
    handleCancel,
    handleNext,
    setForm,
  };
}
