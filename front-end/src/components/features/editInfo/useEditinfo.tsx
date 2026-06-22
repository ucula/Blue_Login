import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { User, UserError } from "@/types/user";
import service from "@/services";
import { hasInput } from "@/utility/checkInput";
import { correctFormat } from "@/utility/checkFormat";

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

  const handleSave = async () => {
    setError({});

    if (!hasInput(["username", "name", "email"], form, updateErrForm)) {
      return;
    }

    if (!correctFormat(["email", "website"], form, updateErrForm)) {
      return;
    }

    editUser(form, {
      onSuccess: () => {
        navigate(`/info/${id}`);
      },
      onError: (err: any) => {
        if (err.errors) {
          for (const key of Object.keys(err.errors)) {
            updateErrForm(key as keyof UserError, err.errors[key]);
          }
        }
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
