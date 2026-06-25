import type { UserError } from "@/types/user";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Form } from "@/types/form";
import service from "@/services";
import { hasInput } from "@/utility/checkInput";
import { correctFormat } from "@/utility/checkFormat";

export default function usePass() {
  const [form, setForm] = useState<Partial<Form>>({});
  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const { mutate: resetMutate, isPending } = service.auth.reset.resetPass();

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string;

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleReset = async () => {
    setErrForm({});

    if (!hasInput(["pass"], form, updateErrForm)) return;
    if (!correctFormat(["pass"], form, updateErrForm)) return;

    if (form.pass !== form.confirm) {
      setErrForm({ pass: "Passwords do not match" });
      return;
    }

    resetMutate(
      { email, pass: form.pass },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (err: any) => {
          updateErrForm("pass", err.message);
        },
      },
    );
  };

  return {
    isPending,
    errForm,
    handleCancel,
    updateForm,
    handleReset,
  };
}
