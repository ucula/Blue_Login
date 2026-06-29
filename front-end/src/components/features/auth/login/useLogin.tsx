import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services";
import type { Auth } from "@/types/auth/auth";
import type { AuthError } from "@/types/auth/error";
import { hasInput } from "@/utility/form/checkInput";
import { correctFormat } from "@/utility/form/checkFormat";

export default function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Auth>>({});
  const [errForm, setErrForm] = useState<Partial<AuthError>>({});
  const { mutate: loginMutate } = service.auth.login.useLogin();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleForget = () => {
    navigate("/reset/email");
  };

  const handleLogin = async () => {
    setErrForm({});
    if (!hasInput(["email", "pass"], form, updateErrForm)) return;
    if (!correctFormat(["email", "pass"], form, updateErrForm)) return;

    loginMutate(form, {
      onSuccess: () => {
        navigate("/brief");
      },
      onError: (err: any) => {
        console.log("Front: ", err);
        setErrForm({ email: err.message, pass: err.message });
      },
    });
  };
  return { form, errForm, handleLogin, handleSignup, handleForget, updateForm };
}
