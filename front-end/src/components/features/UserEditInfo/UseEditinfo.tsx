import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { User, UserError } from "@/types/user";
import { EditUserById } from "@/services/mongo/patchUserbyId";
import { UserById } from "@/services/mongo/fetchUserbyId";
import { checkDupe } from "@/services/mongo/checkDupe";
// import { UsersList } from "@/services/mongo/fetchUsers";

export default function UseEditInfo() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: userbyid, isLoading } = UserById(String(id));
  const { mutate: editUser } = EditUserById();
  const [error, setError] = useState<Partial<UserError>>({});
  const [form, setForm] = useState<Partial<User>>({});

  useEffect(() => {
    if (userbyid) {
      setForm(userbyid);
    }
  }, [userbyid]);

  const handleHome = () => {
    navigate("/brief");
  };

  const handleCancel = () => {
    navigate(`/info/${id}`);
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
    let dupe = false;
    if (user.email === form.email && user.email !== userbyid.email) {
      updateErrForm("email", "Email already exists");
      dupe = true;
    }
    if (
      user.username === form.username &&
      user.username !== userbyid.username
    ) {
      updateErrForm("username", "Username already exists");
      dupe = true;
    }
    return dupe;
  };

  const handleSave = async () => {
    setError({});
    if (!Input()) return;

    if (!ValidateEmail(form.email)) return;
    if (!ValidateWebsite(form.website)) return;
    if (await isDupe()) return;
    editUser(form, {
      onSuccess: () => {
        navigate(`/info/${id}`);
      },
    });
  };

  return {
    loading: isLoading,
    error,
    form,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
    handleCancel,
  };
}
