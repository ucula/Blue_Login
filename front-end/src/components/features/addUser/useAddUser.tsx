import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, UserError } from "@/types/user";
import service from "@/services";
import { hasInput } from "@/utility/checkInput";
import { correctFormat } from "@/utility/checkFormat";

export default function useAddUser() {
  const navigate = useNavigate();
  const { mutate: add } = service.CRUD.postUser();

  const [error, setError] = useState<Partial<UserError>>({});
  const [form, setForm] = useState<Partial<User>>({});

  const handleHome = () => {
    navigate("/brief");
  };

  const updateField = (key: keyof User, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value.trim() }));
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

  const updateErrForm = (key: keyof User, value: string) => {
    setError((prev) => ({ ...prev, [key]: value.trim() }));
  };

  const handleSave = async () => {
    setError({});

    if (!hasInput(["username", "name", "email"], form, updateErrForm)) {
      return;
    }

    if (!correctFormat(["email", "website"], form, updateErrForm)) {
      return;
    }

    add(form, {
      onSuccess: () => {
        navigate("/brief");
      },
      onError: (err: any) => {
        if (err.data) {
          for (const key of Object.keys(err.data)) {
            updateErrForm(key as keyof User, err.data[key]);
          }
        }
      },
    });
  };

  return {
    error,
    form,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
  };
}
