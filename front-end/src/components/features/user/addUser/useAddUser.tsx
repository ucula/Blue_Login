import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services";
import { hasInput } from "@/utility/form/checkInput";
import type { UserError } from "@/types/user/error";
import type { UserForm } from "@/types/user/form";
import { correctFormat } from "@/utility/form/checkFormat";

export default function useAddUser() {
  const navigate = useNavigate();
  const { mutate: add } = service.CRUD.postUser();

  const [error, setError] = useState<Partial<UserError>>({});
  const [form, setForm] = useState<Partial<UserForm>>({ confirmed: true });

  const handleHome = () => {
    navigate("/brief");
  };

  const updateForm = (key: keyof UserForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value.trim() }));
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

  const handleSave = async () => {
    setError({});

    if (!hasInput(["username", "name", "email"], form, updateForm)) {
      return;
    }

    if (!correctFormat(["email", "website"], form, updateForm)) {
      return;
    }

    add(form, {
      onSuccess: () => {
        navigate("/brief");
      },
      onError: (err: any) => {
        if (err.data) {
          for (const key of Object.keys(err.data)) {
            updateForm(key as keyof UserForm, err.data[key]);
          }
        }
      },
    });
  };

  return {
    error,
    form,
    updateForm,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
  };
}
