import type { Form } from "@/types/signlog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkDupe } from "@/services/mongo/checkDupe";

export default function LoginLogic() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Form>>({});
  const [errForm, setErrForm] = useState<Partial<Form>>({});

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  const Input = (label: string) => {
    if (label === "email") {
      if (!form.email || form.email.trim() === "") {
        updateErrForm("email", "No Input");
        return false;
      }
      return true;
    }
    if (label === "pass") {
      if (!form.pass || form.pass.trim() === "") {
        updateErrForm("pass", "No Input");
        return false;
      }
      return true;
    }
  };

  const validateEmail = async () => {
    const { isAvailable } = await checkDupe(form);
    if (isAvailable) {
      updateErrForm("email", "Email unregistered");
      return true;
    }
    return false;
  };

  const handleLogin = async () => {
    setErrForm({});
    if (!Input("email")) return;
    if (await validateEmail()) return;
    if (!Input("pass")) return;

    navigate("/brief");
  };

  return { errForm, handleLogin, handleSignup, updateForm };
}
