import { PATHS } from "@/constants";
import { useNavigate, useParams } from "react-router-dom";
import service from "@/services";
import { sendEmail as sendEmailUtility } from "@/utility/sendEmail";
import { useState, useEffect } from "react";
import { hasInput } from "@/utility/form/checkInput";
import { correctFormat } from "@/utility/form/checkFormat";
import type { User, UserError } from "@/types/user/user";

export default function useAllInfo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [gridSize, setGridSize] = useState<number>(4);
  const [errForm, setErrForm] = useState<Partial<UserError>>({});

  const { data: user, isLoading } = service.admin.fetchUserById(String(id));
  const { mutate: deleteUser } = service.admin.delUserById(String(id));
  const { mutate: editUser } = service.admin.patchUserById(String(id));
  const { mutate: sendEmail, isPending: isSendingEmail } =
    sendEmailUtility(String(id));

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

  const handleViewTasks = () => {
    if (id) {
      navigate(PATHS.ADMIN_USER_TASKS.build(id));
    }
  };

  return {
    isLoading,
    user,
    isEditing,
    setIsEditing,
    form,
    gridSize,
    setForm,
    errForm,
    handleHome,
    handleSave,
    handleCancel,
    handleDelete,
    handleSendAgain,
    isSendingEmail,
    handleViewTasks,
  };
}

