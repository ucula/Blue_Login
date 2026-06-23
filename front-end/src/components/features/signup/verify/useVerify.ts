import service from "@/services";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Track tokens currently verifying to prevent duplicate requests in React 18 StrictMode
const startedVerifications = new Set<string>();

export function useVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleLogin = () => {
    navigate("/");
  };

  const {
    mutateAsync: verifyMutate,
    isPending,
    isSuccess,
    isError,
  } = service.auth.signupVerify();

  const verify = async (token: string) => {
    if (token && !startedVerifications.has(token)) {
      startedVerifications.add(token);
      const data = verifyMutate(token);
      console.log(data);
    }
  };

  console.log(
    "RENDER - isPending:",
    isPending,
    "isSuccess:",
    isSuccess,
    "isError:",
    isError,
  );

  return {
    token,
    verify,

    isPending,
    isSuccess,
    isError,
    handleLogin,
  };
}
