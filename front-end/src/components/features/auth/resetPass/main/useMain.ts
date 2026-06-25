import service from "@/services";
import type { Auth } from "@/types/auth";
import type { UserError } from "@/types/user";
import { correctFormat } from "@/utility/checkFormat";
import { hasInput } from "@/utility/checkInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useMain() {
  const [form, setForm] = useState<Partial<Auth>>({});
  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const { mutate: sendMutate, isPending } = service.auth.reset.sendEmail();
  const navigate = useNavigate();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const handleNext = () => {
    setErrForm({});
    if (!hasInput(["email"], form, updateErrForm)) return;
    if (!correctFormat(["email"], form, updateErrForm)) return;

    sendMutate(form.email, {
      onSuccess: () => {
        navigate("/reset/email-sent");
      },
      onError: (err: any) => {
        updateErrForm("email", err.message);
        console.log(err.message);
        console.log(form);
      },
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return {
    form,
    isPending,
    errForm,
    handleCancel,
    handleNext,
    updateForm,
  };
}
