import { PATHS } from "@/config/path";
import { useNavigate, useParams } from "react-router-dom";
import service from "@/services";
import { useState, useEffect } from "react";
import { hasInput } from "@/utility/form/checkInput";
import { correctFormat } from "@/utility/form/checkFormat";
import type { User, UserError } from "@/types/user/user";

export default function useAllInfo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [del, setDel] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [gridSize, setGridSize] = useState<number>(4);
  const [errForm, setErrForm] = useState<Partial<UserError>>({});

  const { data: user, isLoading } = service.user.fetchUserById(String(id));
  const { mutate: deleteUser } = service.user.delUserById(String(id));
  const { mutate: editUser } = service.user.patchUserById(String(id));
  const { mutate: sendEmail, isPending: isSendingEmail } =
    service.base.sendEmail();

  useEffect(() => {
    if (user) {
      setForm(user);
      if (!user.confirmed) {
        setGridSize(3);
      } else {
        setGridSize(4);
      }
    }
  }, [user]);

  const handledialogue = () => {
    setDel(!del);
  };

  const handleHome = () => {
    navigate(PATHS.ADMIN_HOME);
  };

  const updateErrForm = (label: any, value: any) => {
    setErrForm((prev) => ({ ...prev, [label]: String(value).trim() }));
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
        setIsEditing(false);
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

  const handleCancel = () => {
    if (user) {
      setForm(user);
    }
    setIsEditing(false);
    setErrForm({});
  };

  const handleDelete = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        handleHome();
      },
    });
  };

  const handleSendAgain = () => {
    sendEmail({ email: user.email, path: "/admin/add" });
  };

  return {
    isLoading,
    del,
    user,
    isEditing,
    setIsEditing,
    form,
    gridSize,
    setForm,
    errForm,
    handledialogue,
    handleHome,
    handleSave,
    handleCancel,
    handleDelete,
    handleSendAgain,
    isSendingEmail,
  };
}
