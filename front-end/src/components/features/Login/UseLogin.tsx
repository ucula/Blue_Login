import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserError } from "@/types/user";
import service from "@/services";
import type { Auth } from "@/types/auth";
import { hasInput } from "@/utility/checkInput";
import { correctFormat } from "@/utility/checkFormat";

export default function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Auth>>({});
  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const { mutate: loginMutate } = service.auth.logIn();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    setErrForm({});

    hasInput(["username", "name", "email", "pass"], form, updateErrForm);
    correctFormat(["email", "website", "pass"], form, updateErrForm);

    loginMutate(form, {
      onSuccess: () => {
        navigate("/brief");
      },
    });
  };

  const handleforgot = () => {
    navigate("/reset-pass");
  };
  return { form, errForm, handleLogin, handleSignup, handleforgot, updateForm };
}
