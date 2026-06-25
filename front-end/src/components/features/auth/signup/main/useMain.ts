import type { UserError } from "@/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasInput } from "@/utility/checkInput";
import { correctFormat } from "@/utility/checkFormat";
import service from "@/services";
import type { Form } from "@/types/form";

export default function useSignup() {
  const [form, setForm] = useState<Partial<Form>>({
    username: "cherio",
    name: "chiriew",
    email: "cheriew02@gmail.com",
    pass: "1234567890",
    confirm: "1234567890",
  });

  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const { isPending, mutate: signUpMutate } = service.auth.signup.signUp();
  const navigate = useNavigate();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateAddressField = (key: keyof Form["address"], value: string) => {
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value.trim() },
    }));
  };

  const updateCompanyField = (key: keyof Form["company"], value: string) => {
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

    if (form.pass !== form.confirm) {
      updateErrForm("pass", "Password and Confirm needs to be the same");
      return;
    }

    signUpMutate(form, {
      onSuccess: () => {
        navigate("/signup/email-sent", { state: form });
      },
      onError: (err: any) => {
        console.log(err);
        if (err.data) {
          for (const key of Object.keys(err.data)) {
            updateErrForm(key as keyof Form, err.data[key]);
          }
        }
      },
    });
  };

  return {
    form,
    isPending,
    errForm,
    handleCancel,
    updateForm,
    updateAddressField,
    updateCompanyField,
    handleSignup,
  };
}
