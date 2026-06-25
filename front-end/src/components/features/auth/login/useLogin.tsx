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
    if (!hasInput(["email", "pass"], form, updateErrForm)) return;
    if (!correctFormat(["email", "pass"], form, updateErrForm)) return;

    loginMutate(form, {
      onSuccess: () => {
        navigate("/brief");
      },
      onError: (err: any) => {
        console.log(err);
        updateErrForm(err.data, err.message);
      },
    });
  };

  const handleforgot = () => {
    navigate("/reset/email");
  };
  return { form, errForm, handleLogin, handleSignup, handleforgot, updateForm };
}
