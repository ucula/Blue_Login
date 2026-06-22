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

  const hasInput = (form: Partial<User>) => {
    const err: Partial<UserError> = {};
    const fieldsToCheck: (keyof User)[] = ["username", "name", "email"];

    for (const key of fieldsToCheck) {
      if (!form[key] || String(form[key]).trim() === "") {
        err[key as keyof UserError] = "No input";
      }
    }

    if (Object.keys(err).length > 0) return err;
  };

  const correctFormat = (label: string, value: string) => {
    if (label === "email") {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    }
    if (label === "website") {
      if (!value || value.trim() === "") return true;
      return /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
        value,
      );
    }
  };

  const handleSave = async () => {
    setError({});
    const validationErrors = hasInput(form) || {};

    if (!correctFormat("email", form.email || "")) {
      validationErrors.email = "Wrong Email Format";
    }
    if (!correctFormat("website", form.website || "")) {
      validationErrors.website = "Wrong Website Format";
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    add(form, {
      onSuccess: () => {
        navigate("/brief");
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
    error,
    form,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
  };
}
