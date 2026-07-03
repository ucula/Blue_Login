import { PATHS } from "@/config/path";
import { useNavigate, useParams } from "react-router-dom";
import service from "@/services";
import { useState } from "react";

export default function useAllInfo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [del, setDel] = useState<boolean>(false);

  const { data: user, isLoading } = service.user.fetchUserById(String(id));
  const { mutate: deleteUser } = service.user.delUserById(String(id));

  const handledialogue = () => {
    setDel(!del);
  };

  const handleHome = () => {
    navigate(PATHS.ADMIN_HOME);
  };

  const handleEdit = () => {
    navigate(PATHS.ADMIN_INFO_EDIT(String(id)));
  };

  const handleDelete = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        handleHome();
      },
    });
  };

  return {
    isLoading,
    del,
    user,
    handledialogue,
    handleHome,
    handleEdit,
    handleDelete,
  };
}
