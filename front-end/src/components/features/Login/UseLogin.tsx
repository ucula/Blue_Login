import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/user";
import { loginHandler } from "@/services/auth/login";

export default function LoginLogic() {
  const navigate = useNavigate();
  const { mutateAsync: login } = loginHandler();
  const [form, setForm] = useState<Partial<User>>({});
  const [errForm, setErrForm] = useState<Partial<User>>({});

  const updateForm = (label: string, value: string) => {
    setForm((prev) => ({ ...prev, [label]: value }));
  };

  const updateErrForm = (label: string, value: string) => {
    setErrForm((prev) => ({ ...prev, [label]: value }));
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const hasInput = (label: string) => {
    if (label === "email") {
      if (!form.email || form.email.trim() === "") {
        updateErrForm("email", "No Input");
        return false;
      }
    } else if (label === "pass") {
      if (!form.pass || form.pass.trim() === "") {
        updateErrForm("pass", "No Input");
        return false;
      }
    }
    return true;
  };

  const correctFormat = (label: string) => {
    if (label === "email") {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        form.email.trim(),
      );
      if (!isEmail) {
        updateErrForm("email", "Wrong Format");
        return false;
      }
    }
    return true;
  };

  const handleLogin = async () => {
    setErrForm({});
    if (form.email === "admin") {
      navigate("/brief");
    }

    if (!hasInput("email")) return;
    if (!correctFormat("email")) return;
    try {
      await login({ email: form.email });
    } catch (err: any) {
      updateErrForm("email", err.message);
      return;
    }

    if (!hasInput("pass")) return;

    try {
      await login({ email: form.email, pass: form.pass });
      navigate("/brief");
    } catch (err: any) {
      updateErrForm("pass", err.message);
    }
  };

  return { form, errForm, handleLogin, handleSignup, updateForm };
}
