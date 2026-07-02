import { PATHS } from "@/config/path";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "@/services";
import { hasInput } from "@/utility/form/checkInput";
import type { User, UserError } from "@/types/user/user";
import { correctFormat } from "@/utility/form/checkFormat";

export default function useEditInfo() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: userbyid, isLoading } = service.CRUD.fetchUserById(String(id));
  const { mutate: editUser } = service.CRUD.patchUserById(String(id));
  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const [form, setForm] = useState<Partial<User>>({});

  useEffect(() => {
    if (userbyid) {
      setForm(userbyid);
    }
  }, [userbyid]);

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const handleSave = async () => {
    setErrForm({});

    if (!hasInput(["username", "name", "email"], form, updateErrForm)) {
      return;
    }

    if (!correctFormat(["email", "website"], form, updateErrForm)) {
      return;
    }

    editUser(form, {
      onSuccess: () => {
        navigate(PATHS.ADMIN_USER_INFO(String(id)));
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
    navigate(PATHS.ADMIN_HOME);
  };

  const handleCancel = () => {
    navigate(PATHS.ADMIN_USER_INFO(String(id)));
  };
  return {
    isLoading,
    errForm,
    form,
    setForm,
    handleSave,
    handleHome,
    handleCancel,
  };
}
