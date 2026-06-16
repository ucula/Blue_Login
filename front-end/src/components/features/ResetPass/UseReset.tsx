import type { User } from "@/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UseReset() {
  const { mutate: reset } = resetHandler();
  const [insPass, setInsPass] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [errForm, setErrForm] = useState<Partial<User>>({});
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

  const handleBack = () => {
    setInsPass(false);
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
    } else if (label === "pass") {
      if (form.pass.length < 8) {
        updateErrForm("pass", "Password must be longer than 8 chars");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setErrForm({});
    if (!hasInput("email")) return;
    if (!correctFormat("email")) return;

    reset(form, {
      onSuccess: () => {
        setInsPass(true);
      },
      onError: (err: any) => {
        updateErrForm("email", err.message);
        return;
      },
    });
  };

  const handleSignup = () => {
    setErrForm({});
    if (!hasInput("pass")) return;
    if (!correctFormat("pass")) return;

    reset(form, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return {
    insPass,
    errForm,
    handleCancel,
    handleNext,
    updateForm,
    handleSignup,
    handleBack,
  };
}
