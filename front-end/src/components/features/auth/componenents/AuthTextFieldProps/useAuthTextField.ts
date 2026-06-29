import { useState } from "react";

export default function useAuthTextField() {
  const [hidePass, setHidePass] = useState(true);

  const handleClickShowPassword = () => {
    setHidePass((prev) => !prev);
  };

  return { hidePass, handleClickShowPassword };
}
