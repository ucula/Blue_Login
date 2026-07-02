import { PATHS } from "@/config/path";
import service from "@/services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasInput } from "@/utility/form/checkInput";
import { correctFormat } from "@/utility/form/checkFormat";
import type { SignupForm, SignupFormError } from "@/types/auth/auth";

export default function useSignup() {
  const [form, setForm] = useState<Partial<SignupForm>>({});
  const [errForm, setErrForm] = useState<Partial<SignupFormError>>({});
  const { isPending, mutate: signupMutate } = service.auth.signup.useSignup();
  const navigate = useNavigate();

  const updateErrForm = (key: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    navigate(PATHS.ROOT);
  };

  const handleSignup = async () => {
    setErrForm({});
    if (!hasInput(["username", "name", "email", "pass"], form, updateErrForm)) {
      return;
    }

    if (!correctFormat(["email", "website", "pass"], form, updateErrForm)) {
      return;
    }

    if (form.pass !== form.confirmPass) {
      setErrForm({ pass: "Passwords need to be the same" });
      return;
    }

    signupMutate(form, {
      onSuccess: () => {
        navigate(PATHS.SIGNUP_EMAIL_SENT, { state: form });
      },
      onError: (err: any) => {
        setErrForm({ username: err.message, email: err.message });
      },
    });
  };

  return {
    isPending,
    form,
    errForm,
    handleCancel,
    setForm,
    handleSignup,
  };
}
