import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, UserError } from "@/types/user";
import { UsersList } from "@/services/mongo/fetchUsers";
import { EditUsersList } from "@/services/mongo/postUsers";

export default function FormUserLogic() {
  const navigate = useNavigate();

  const { data: users } = UsersList();
  const { mutate: addUser } = EditUsersList();
  const [error, setError] = useState<UserError>({
    username: "",
    name: "",
    email: "",
    website: "",
  });

  const [newUser, setNewUser] = useState<User>({
    username: "",
    name: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" },
  });

  const handleHome = () => {
    navigate("/brief");
  };

  const updateField = (key: keyof User, value: string) => {
    setNewUser((prev) => ({ ...prev, [key]: value }));
    // console.log(formData);
  };

  const updateAddressField = (key: keyof User["address"], value: string) => {
    setNewUser((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
  };

  const updateCompanyField = (key: keyof User["company"], value: string) => {
    setNewUser((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value },
    }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidWebsite = (url: string) => {
    const urlRegex =
      /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    return urlRegex.test(url);
  };

  async function handleSave() {
    const newError = { username: "", name: "", email: "", website: "" };
    let hasError = false;

    // Check empty fields
    if (newUser.username.trim() === "") {
      newError.username = "Username is empty";
      hasError = true;
    }
    if (newUser.name.trim() === "") {
      newError.name = "Name is empty";
      hasError = true;
    }
    if (newUser.email.trim() === "") {
      newError.email = "Email is empty";
      hasError = true;
    }

    // Check duplicates
    if (
      newUser.username.trim() &&
      users.some((u) => u.username === newUser.username)
    ) {
      newError.username = "Username already exists";
      hasError = true;
    }
    if (newUser.email.trim() && users.some((u) => u.email === newUser.email)) {
      newError.email = "Email already exists";
      hasError = true;
    }

    // Check format
    if (newUser.email.trim() && !isValidEmail(newUser.email)) {
      newError.email = "Invalid email format";
      hasError = true;
    }
    if (newUser.website.trim() && !isValidWebsite(newUser.website)) {
      newError.website = "Invalid website URL";
      hasError = true;
    }

    setError(newError);

    if (hasError) {
      return;
    }

    addUser(newUser, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  return {
    error,
    newUser,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
  };
}
