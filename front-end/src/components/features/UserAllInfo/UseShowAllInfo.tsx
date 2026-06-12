import { useNavigate, useParams } from "react-router-dom";
import type { Address, Company } from "@/types/user";
import { UserById } from "@/services/mongo/fetchUserbyId";
import { DelUserById } from "@/services/mongo/deleteUserById";
import { useState } from "react";

export default function UserAllInfoLogic() {
  const navigate = useNavigate();
  const [del, setDel] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { data: user } = UserById(String(id));
  const { mutate: deleteUser } = DelUserById();

  const handledialogue = () => {
    setDel(!del);
  };
  const handleHome = () => {
    navigate("/brief");
  };
  const handleEdit = () => {
    navigate(`/edit/${id}`);
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
