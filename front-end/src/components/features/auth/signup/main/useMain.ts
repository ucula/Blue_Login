import service from "@/services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserForm } from "@/types/user/form";
import type { UserError } from "@/types/user/error";
import { hasInput } from "@/utility/form/checkInput";
import { correctFormat } from "@/utility/form/checkFormat";

export default function useSignup() {
  const [form, setForm] = useState<Partial<UserForm>>({});
  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const { isPending, mutate: signupMutate } = service.auth.signup.useSignup();
  const [hidePass, setHidePass] = useState(true);

  const handleClickShowPassword = () => setHidePass((show) => !show);
  const navigate = useNavigate();

  const updateForm = (key: keyof UserForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value.trim() }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const updateAddressField = (
    key: keyof UserForm["address"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value.trim() },
    }));
  };

  const updateCompanyField = (
    key: keyof UserForm["company"],
    value: string,
  ) => {
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
      setErrForm({ pass: "Passwords need to be the same" });
      return;
    }

    signupMutate(form, {
      onSuccess: () => {
        navigate("/signup/email/send", { state: form });
      },
      onError: (err: any) => {
        console.log("Front: ", err);
        setErrForm({ username: err.message, email: err.message });
      },
    });
  };

  return {
    hidePass,
    handleClickShowPassword,
    isPending,
    form,
    errForm,
    handleCancel,
    updateForm,
    updateAddressField,
    updateCompanyField,
    handleSignup,
  };
}
