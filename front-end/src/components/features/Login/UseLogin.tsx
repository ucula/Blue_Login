import { Signup } from "@/services/mongo/signup";
import type { Form } from "@/types/signlog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginLogic() {
  const navigate = useNavigate();
  const { mutate: signup } = Signup();
  const [form, setForm] = useState<Form>({
    email: "",
    pass: "",
  });

  const updateField = (key: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = (form: Form) => {
    navigate("/brief");
  };

  const handleSignup = () => {
    signup(form);
  };
  return { handleLogin, handleSignup, updateField };
}
