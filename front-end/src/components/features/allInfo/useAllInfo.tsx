import { useNavigate, useParams } from "react-router-dom";
import type { Address, Company } from "@/types/user";
import service from "@/services";
import { useState } from "react";

export default function useAllInfo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [del, setDel] = useState<boolean>(false);

  const { data: user } = service.CRUD.fetchUserById(String(id));
  const { mutate: deleteUser } = service.CRUD.delUserById(String(id));

  const handledialogue = () => {
    setDel(!del);
  };

  const handleHome = () => {
    navigate("/brief");
  };

  const handleEdit = () => {
    navigate(`/info/${id}/edit`);
  };

  const handleDelete = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        handleHome();
      },
    });
  };

  const showAddress = ({ street, suite, city, zipcode }: Address) => {
    return <span>{`${street}, ${suite}, ${city}, ${zipcode}`}</span>;
  };

  const showCompanyName = ({ name }: Company) => {
    return <span>{`${name}`}</span>;
  };

  return {
    del,
    user,
    handledialogue,
    handleHome,
    handleEdit,
    handleDelete,
    showAddress,
    showCompanyName,
  };
}
