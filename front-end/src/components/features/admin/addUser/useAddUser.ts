import { PATHS } from "@/config/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services";
import { hasInput } from "@/utility/form/checkInput";
import type { User, UserError } from "@/types/user/user";
import { correctFormat } from "@/utility/form/checkFormat";

export default function useAddUser() {
  const navigate = useNavigate();
  const { mutate: add, isPending } = service.user.postUser();
  const [errForm, setErrForm] = useState<Partial<UserError>>({});
  const [form, setForm] = useState<Partial<User>>({});

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value.trim() }));
  };

  const handleHome = () => {
    navigate(PATHS.ADMIN_HOME);
  };

  const handleSave = async () => {
    setErrForm({});

    if (!hasInput(["username", "name", "email"], form, updateErrForm)) {
      return;
    }

    if (!correctFormat(["email", "website"], form, updateErrForm)) {
      return;
    }

    add(form, {
      onSuccess: () => {
        navigate(PATHS.ADMIN_ADD_SEND, { state: form });
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
    isPending,
    form,
    errForm,
    setForm,
    handleSave,
    handleHome,
  };
}
