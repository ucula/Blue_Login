import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { User, UserError } from "@/types/user";
import service from "@/services";

export default function useEditInfo() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: userbyid, isLoading } = service.CRUD.fetchUserById(String(id));
  const { mutate: editUser } = service.CRUD.patchUserById(String(id));
  const [error, setError] = useState<Partial<UserError>>({});
  const [form, setForm] = useState<Partial<User>>({});

  useEffect(() => {
    if (userbyid) {
      setForm(userbyid);
    }
  }, [userbyid]);

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

  const updateErrForm = (key: keyof UserError, value: string) => {
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

    if (err) return;
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
    let err: any;
    setError({});

    err = hasInput(form);
    if (err) {
      setError(err);
    }
    if (!correctFormat("email")) {
      updateErrForm("email", "Wrong Email Format");
      return;
    }
    if (!correctFormat("website")) {
      updateErrForm("email", "Wrong Website Format");
      return;
    }
    editUser(form, {
      onSuccess: () => {
        navigate(`/info/${id}`);
      },
    });
  };

  const handleHome = () => {
    navigate("/brief");
  };

  const handleCancel = () => {
    navigate(`/info/${id}`);
  };
  return {
    loading: isLoading,
    error,
    form,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
    handleCancel,
  };
}
