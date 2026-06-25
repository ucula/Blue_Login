import service from "@/services";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleLogin = () => {
    navigate("/");
  };

  const { isPending, isSuccess, isError } =
    service.auth.signup.signupVerify(token);

  return {
    token,
    isPending,
    isSuccess,
    isError,
    handleLogin,
  };
}
