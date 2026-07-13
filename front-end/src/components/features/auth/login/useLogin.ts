import { PATHS } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services";
import type { LoginForm, LoginFormError } from "@/types/auth/auth";
import { hasInput } from "@/utility/form/checkInput";
import { checkRoles, decodeToken } from "@/utility";
import { TOKEN_NAME } from "@/config";

export default function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<LoginForm>>({});
  const [errForm, setErrForm] = useState<Partial<LoginFormError>>({});
  const { mutate: loginMutate } = service.auth.useLogin();

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

    loginMutate(form, {
      onSuccess: () => {
        const token = localStorage.getItem(TOKEN_NAME);
        const decoded = token ? decodeToken(token) : null;
        const redirectPath = checkRoles(decoded?.role);
        navigate(redirectPath);
      },
      onError: (err: any) => {
        console.log("Front: ", err);
        setErrForm({ email: err.message, pass: err.message });
      },
    });
  };

  return { form, errForm, handleLogin, handleSignup, handleForget, setForm };
}
