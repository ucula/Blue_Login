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
  const [errform, setErrForm] = useState<Form>({
    email: "",
    pass: "",
  });
  // const updateError = (key: keyof Form, value: string) => {
  //   setErrForm((prev) => ({ ...prev, [key]: value }));
  //   // console.log(form);
  // };

  const updateField = (key: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // console.log(form);
  };

  const handleLogin = () => {
    navigate("/brief");
  };

  const handleMissing = () => {
    let newError = { email: "", pass: "" };
    let hasError = false;
    // Validate missing inputs
    if (form.email === "") {
      hasError = true;
      newError.email = "Missing inputs";
    } else {
      if (form.pass === "") {
        hasError = true;
        newError.pass = "Please input your passwords";
      }
    }
    setErrForm(newError);
    if (hasError) return;
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return { errform, handleLogin, handleSignup, updateField };
}
