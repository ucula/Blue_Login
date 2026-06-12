import { checkDupeEmail } from "@/services/mongo/checkDupeEmail";
import type { User } from "@/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ErrorForm = {
  email: string;
  pass: string;
};

export default function UseSignup() {
  const [insPass, setInsPass] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [errForm, setErrForm] = useState<Partial<ErrorForm>>({});
  const navigate = useNavigate();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const noInput = () => {
    if (!form.email || form.email.trim() === "") {
      setErrForm({ ...errForm, email: "No Input" });
      return true;
    }
    return false;
  };

  const notEmailFormat = () => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      form.email.trim(),
    );
    if (!isEmail) {
      setErrForm({ ...errForm, email: "Not Email Format" });
      return true;
    }
    return false;
  };

  const isDupe = async () => {
    const isDupe = await checkDupeEmail(form.email);
    if (isDupe) {
      setErrForm({ ...errForm, email: "Email already Exists" });
      return true;
    }
    return false;
  };

  const handleEmail = async () => {
    console.log(insPass);
    if (noInput()) return;
    if (notEmailFormat()) return;
    if (await isDupe()) return;

    setInsPass(true);
  };
  return { insPass, errForm, handleCancel, handleEmail, updateForm };
}
