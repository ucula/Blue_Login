import { PATHS } from "@/config/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services";
import type { LoginForm, LoginFormError } from "@/types/auth/auth";
import { hasInput } from "@/utility/form/checkInput";
import { correctFormat } from "@/utility/form/checkFormat";

export default function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<LoginForm>>({});
  const [errForm, setErrForm] = useState<Partial<LoginFormError>>({});
  const { mutate: loginMutate } = service.auth.login.useLogin();

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const handleSignup = () => {
    navigate(PATHS.SIGNUP);
  };

  const handleForget = () => {
    navigate(PATHS.RESET);
  };

  const handleLogin = async () => {
    setErrForm({});
    if (!hasInput(["email", "pass"], form, updateErrForm)) return;
    if (!correctFormat(["email", "pass"], form, updateErrForm)) return;

    loginMutate(form, {
      onSuccess: () => {
        navigate(PATHS.ADMIN_HOME);
      },
      onError: (err: any) => {
        console.log("Front: ", err);
        setErrForm({ email: err.message, pass: err.message });
      },
    });
  };
  return { form, errForm, handleLogin, handleSignup, handleForget, setForm };
}
