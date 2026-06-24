import { useFetch } from "@/utility/useFetch";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type VerifyStatus = "pending" | "success" | "error";

export default function useVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<VerifyStatus>("pending");
  const hasStarted = useRef(false);

  const handleLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!token || hasStarted.current) return;
    hasStarted.current = true;

    const verify = async () => {
      try {
        await useFetch("http://localhost:5001/api/user/signup/verify", "POST", {
          token,
        });
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  return {
    token,
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    handleLogin,
  };
}
