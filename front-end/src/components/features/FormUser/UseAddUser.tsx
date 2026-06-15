import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, UserError } from "@/types/user";
import { addUser } from "@/services/mongo/postUsers";
import { checkDupe } from "@/services/mongo/checkDupe";

export default function FormUserLogic() {
  const navigate = useNavigate();
  const { mutate: add } = addUser();
  const [error, setError] = useState<Partial<UserError>>({});
  const [form, setForm] = useState<User>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
    },
  });

  const handleHome = () => {
    navigate("/brief");
  };

  const updateField = (key: keyof User, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value.trim() }));
  };

  const updateAddressField = (key: keyof User["address"], value: string) => {
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value.trim() },
    }));
  };

  const updateCompanyField = (key: keyof User["company"], value: string) => {
    setForm((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value.trim() },
    }));
  };

  const updateErrForm = (key: keyof User, value: string) => {
    setError((prev) => ({ ...prev, [key]: value.trim() }));
  };

  const ValidateEmail = (email: string) => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email,
    );
    if (!isEmail) {
      updateErrForm("email", "Wrong Email Format");
      return false;
    }
    return true;
  };

  const ValidateWebsite = (url: string) => {
    const isWebsite =
      /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
        url,
      );
    if (!isWebsite && url !== "") {
      updateErrForm("website", "Wrong Website Format");
      return false;
    }
    return true;
  };

  const Input = () => {
    let hasInput = true;
    if (!form.email) {
      updateErrForm("email", "No Input");
      hasInput = false;
    }
    if (!form.username) {
      updateErrForm("username", "Username is empty");
      hasInput = false;
    }
    if (!form.name) {
      updateErrForm("name", "Name is empty");
      hasInput = false;
    }
    return hasInput;
  };

  const isDupe = async () => {
    const { user } = await checkDupe(form);
    if (!user) return false;
    if (user.email === form.email) {
      updateErrForm("email", "Email already exists");
    }
    if (user.username === form.username) {
      updateErrForm("username", "Username already exists");
    }
    return true;
  };

  const handleSave = async () => {
    setError({});
    if (!Input()) return;
    if (!ValidateEmail(form.email)) return;
    if (!ValidateWebsite(form.website)) return;
    if (await isDupe()) return;
    add(form, {
      onSuccess: () => {
        navigate("/brief");
      },
      onError: () => {
        console.log(error);
      },
    });
  };

  return {
    error,
    form,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
  };
}
