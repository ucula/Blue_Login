import type { User, UserError } from "@/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasInput } from "@/utility/checkInput";
import { correctFormat } from "@/utility/checkFormat";
import { signUp } from "@/services/auth";

export default function useSignup() {
  const [form, setForm] = useState<Partial<User>>({
    username: "cherio",
    name: "cherio",
    email: "chiriew123@gmail.com",
    pass: "1234567890",
  });
  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const { isPending, mutate: signUpMutate } = signUp();
  const navigate = useNavigate();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateAddressField = (key: keyof User["address"], value: string) => {
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value.trim() },
    }));
  };

  const updateCompanyField = (key: keyof User["company"], value: string) => {
    setForm((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value.trim() },
    }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSignup = async () => {
    setErrForm({});
    if (!hasInput(["username", "name", "email", "pass"], form, updateErrForm)) {
      return;
    }

    if (!correctFormat(["email", "website", "pass"], form, updateErrForm)) {
      return;
    }

    signUpMutate(form, {
      onSuccess: () => {
        navigate("/signup/email-sent", { state: form });
      },
      onError: (err: any) => {
        if (err.errors) {
          for (const key of Object.keys(err.errors)) {
            updateErrForm(key as keyof User, err.errors[key]);
          }
        }
      },
    });
  };

  return {
    isPending,
    errForm,
    handleCancel,
    updateForm,
    updateAddressField,
    updateCompanyField,
    handleSignup,
  };
}
