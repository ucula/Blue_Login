import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "@/services";
import { hasInput } from "@/utility/form/checkInput";
import type { UserError } from "@/types/user/error";
import type { User } from "@/types/user/user";
import { correctFormat } from "@/utility/form/checkFormat";

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
        if (err.data) {
          for (const key of Object.keys(err.data)) {
            updateErrForm(key as keyof UserError, err.data[key]);
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
