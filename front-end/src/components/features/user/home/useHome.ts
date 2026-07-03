import { PATHS } from "@/config/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@/services";
import type { User } from "@/types/user/user";

export default function useHome() {
  const navigate = useNavigate();
  const { data: users, isLoading } = service.user.fetchUsers();
  const [filterText, setFilterText] = useState("");

  const handleBack = () => {
    navigate(PATHS.ROOT);
  };

  const handleAdd = () => {
    navigate(PATHS.ADMIN_ADD);
  };

  const handleInfo = (id: string) => {
    navigate(PATHS.ADMIN_USER_INFO(id));
  };

  const filteredUsers = (): User[] => {
    const query = filterText.trim().toLowerCase();
    if (!query) return users || [];
    return (users || []).filter(
      ({ username, name, email }: User) =>
        username.toLowerCase().includes(query) ||
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query),
    );
  };

  return {
    users,
    isLoading,
    handleBack,
    handleAdd,
    handleInfo,
    filteredUsers,
    filterText,
    setFilterText,
  };
}
