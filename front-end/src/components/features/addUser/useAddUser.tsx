import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, UserError } from "@/types/user";
import service from "@/services";

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

  const hasInput = (fields: Partial<User>) => {
    let isValid = true;
    for (const key in fields) {
      const typekey = key as keyof UserError;
      const input = fields[typekey];
      if (!input || input.trim() === "") {
        updateErrForm(typekey, "Missing Input");
        isValid = false;
      }
    }
    return isValid;
  };

  const correctFormat = (label: string) => {
    if (label === "email") {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        form.email.trim(),
      );
    }
    if (label === "website") {
      if (form.website.trim() === "" || !form.website) return true;
      return /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
        form.website,
      );
    }
  };

  const handleSave = async () => {
    setError({});
    if (
      !hasInput({ name: form.name, username: form.username, email: form.email })
    )
      return;
    if (!correctFormat("email")) {
      updateErrForm("email", "Wrong Email Format");
      return;
    }
    if (!correctFormat("website")) {
      updateErrForm("email", "Wrong Website Format");
      return;
    }
    add(form, {
      onSuccess: () => {
        navigate("/brief");
      },
      onError: (err: any) => {
        if (err.errors) {
          for (const key in err.errors) {
            updateErrForm(key as keyof User, err.errors[key]);
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
