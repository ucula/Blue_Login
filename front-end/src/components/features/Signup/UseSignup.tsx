import { checkDupe } from "@/services/mongo/checkDupe";
import { addUser } from "@/services/mongo/postUsers";
import type { Form } from "@/types/signlog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UseAuthHandler() {
  const { mutate: signup } = addUser();
  const [insPass, setInsPass] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<Form>>({});
  const [errForm, setErrForm] = useState<Partial<Form>>({});
  const navigate = useNavigate();

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const Input = (label: string) => {
    if (label === "email") {
      if (!form.email || form.email.trim() === "") {
        updateErrForm("email", "No Input");
        return true;
      }
      return false;
    }
    if (label === "pass") {
      if (!form.pass || form.pass.trim() === "") {
        updateErrForm("pass", "No Input");
        return true;
      }
      return false;
    }
  };

  const Format = (label: string) => {
    if (label === "email") {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        form.email.trim(),
      );
      if (!isEmail) {
        updateErrForm("email", "Not Email Format");
        return true;
      }
      return false;
    }
    if (label === "pass") {
      if (form.pass.length < 8) {
        updateErrForm("pass", "Password must be longer than 8 chars");
        return true;
      }
      return false;
    }
  };

  const isDupe = async () => {
    const { isAvailable, message } = await checkDupe(form);
    if (!isAvailable) {
      updateErrForm("email", message);
      return true;
    }
    return false;
  };

  const handleEmail = async () => {
    setErrForm({});
    if (Input("email")) return;
    if (Format("email")) return;
    if (await isDupe()) return;

    setInsPass(true);
  };

  const handleSignup = async () => {
    setErrForm({});
    if (await isDupe()) {
      setInsPass(false);
      return;
    }
    if (Input("email")) {
      setInsPass(false);
      return;
    }
    if (Format("email")) {
      setInsPass(false);
      return;
    }
    if (Input("pass")) return;
    if (Format("pass")) return;

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
