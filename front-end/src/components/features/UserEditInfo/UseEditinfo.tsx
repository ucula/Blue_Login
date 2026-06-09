import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { User, UserError } from "@/types/user";
import { EditUserById } from "@/services/mongo/patchUserbyId";
import { UserById } from "@/services/mongo/fetchUserbyId";

export default function UseEditInfo() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = UserById(String(id));
  const { mutate: editUser } = EditUserById();

  const [error, setError] = useState<UserError>({
    username: "",
    name: "",
    email: "",
    website: "",
  });

  const [formData, setFormData] = useState<User>({
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

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleHome = () => {
    navigate("/brief");
  };

  const handleCancel = () => {
    navigate(`/info/${id}`);
  };

  const updateField = (key: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateAddressField = (key: keyof User["address"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
  };

  const updateCompanyField = (key: keyof User["company"], value: string) => {
    setFormData((prev) => ({
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

  const handleSave = async () => {
    const newError = { username: "", name: "", email: "", website: "" };
    let hasError = false;

    // Check empty fields
    if (formData.username.trim() === "") {
      newError.username = "Username is empty";
      hasError = true;
    }
    if (formData.name.trim() === "") {
      newError.name = "Name is empty";
      hasError = true;
    }
    if (formData.email.trim() === "") {
      newError.email = "Email is empty";
      hasError = true;
    }

    const storedData = localStorage.getItem("myData");
    const users: User[] = storedData ? JSON.parse(storedData) : [];

    // Check duplicates (excluding the current user being edited)
    if (
      formData.username.trim() &&
      users.some(
        (u) => u.username === formData.username && u._id !== String(id),
      )
    ) {
      newError.username = "Username already exists";
      hasError = true;
    }
    if (
      formData.email.trim() &&
      users.some((u) => u.email === formData.email && u._id !== String(id))
    ) {
      newError.email = "Email already exists";
      hasError = true;
    }

    // Check format
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newError.email = "Invalid email format";
      hasError = true;
    }
    if (formData.website.trim() && !isValidWebsite(formData.website)) {
      newError.website = "Invalid website URL";
      hasError = true;
    }

    setError(newError);

    if (hasError) {
      return;
    }

    editUser(formData, {
      onSuccess: () => {
        navigate(`/info/${id}`);
      },
    });
  };

  return {
    loading: isLoading,
    error,
    formData,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
    handleCancel,
  };
}
