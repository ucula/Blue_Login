import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import service from "@/services";
import type { Auth } from "@/types/auth/auth";
import type { AuthError } from "@/types/auth/error";
import { hasInput } from "@/utility/form/checkInput";
import { correctFormat } from "@/utility/form/checkFormat";

export default function usePass() {
  const [form, setForm] = useState<Partial<Auth>>({});
  const [errForm, setErrForm] = useState<Partial<AuthError>>({});
  const [searchParams] = useSearchParams();
  const { mutate: resetMutate, isPending } = service.auth.reset.useReset();

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string;
  const token = searchParams.get("token");

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
    updateForm,
    handleReset,
  };
}
