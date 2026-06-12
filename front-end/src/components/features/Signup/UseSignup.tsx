import { checkDupeEmail } from "@/services/mongo/checkDupeEmail";
import { addUser } from "@/services/mongo/postUsers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type Form = {
  email: string;
  pass: string;
};

export default function UseAuthHandler() {
  const { mutate: signup } = addUser();
  const [insPass, setInsPass] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<Form>>({});
  const [errForm, setErrForm] = useState<Partial<Form>>({});
  const navigate = useNavigate();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const noInput = (label: string) => {
    if (label === "email") {
      if (!form.email || form.email.trim() === "") {
        setErrForm({ ...errForm, email: "No Input" });
        return true;
      }
      return false;
    }
    if (label === "pass") {
      if (!form.pass || form.pass.trim() === "") {
        setErrForm({ ...errForm, pass: "No Input" });
        return true;
      }
      return false;
    }
  };

  const notFormat = (label: string) => {
    if (label === "email") {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        form.email.trim(),
      );
      if (!isEmail) {
        setErrForm({ ...errForm, email: "Not Email Format" });
        return true;
      }
      return false;
    }
    if (label === "pass") {
      if (form.pass.length < 8) {
        setErrForm({
          ...errForm,
          pass: "Password must be longer than 8 chars",
        });
        return true;
      }
      return false;
    }
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
    // console.log(insPass);
    if (noInput("email")) return;
    if (notFormat("email")) return;
    if (await isDupe()) return;

    setInsPass(true);
  };

  const handleSignup = async () => {
    if (noInput("pass")) return;
    if (notFormat("pass")) return;

    signup(form);
    navigate("/");
  };
  return {
    insPass,
    errForm,
    handleCancel,
    handleEmail,
    updateForm,
    handleSignup,
  };
}
