import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/user";
import service from "@/services";

export default function useHome() {
  const navigate = useNavigate();
  const { data: users, isLoading } = service.CRUD.fetchUsers();
  const [filterText, setFilterText] = useState("");

  const handleBack = () => {
    navigate("/");
  };

  const handleAdd = () => {
    navigate("/add");
  };

  const handleInfo = (id: string) => {
    navigate(`/info/${id}`);
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
