import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import service from "@/services";
import type { ResetPassForm, ResetPassFormError } from "@/types/auth/auth";
import { hasInput } from "@/utility/form/checkInput";
import { correctFormat } from "@/utility/form/checkFormat";

export default function usePass() {
  const [form, setForm] = useState<Partial<ResetPassForm>>({});
  const [errForm, setErrForm] = useState<Partial<ResetPassFormError>>({});
  const [searchParams] = useSearchParams();
  const { mutate: resetMutate, isPending } = service.auth.reset.useReset();

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string;
  const token = searchParams.get("token");

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

    if (form.pass !== form.confirmPass) {
      setErrForm({ pass: "Passwords do not match" });
      return;
    }

    resetMutate(
      { email, pass: form.pass, token },
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
    setForm,
    form,
    handleReset,
  };
}
