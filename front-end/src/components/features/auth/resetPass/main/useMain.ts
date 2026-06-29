import service from "@/services";
import type { Auth } from "@/types/auth/auth";
import type { AuthError } from "@/types/auth/error";
import { hasInput } from "@/utility/form/checkInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useMain() {
  const [form, setForm] = useState<Partial<Auth>>({});
  const [errForm, setErrForm] = useState<Partial<AuthError>>({});
  const { mutate: sendMutate, isPending } = service.auth.reset.sendEmail();
  const navigate = useNavigate();

  const updateForm = (label: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [label]: value }));
  };

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
        navigate("/reset/email/send");
      },
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return {
    form,
    errForm,
    isPending,
    handleCancel,
    handleNext,
    updateForm,
  };
}
