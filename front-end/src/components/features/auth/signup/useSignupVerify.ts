import { PATHS } from "@/config/path";
import { useNavigate, useSearchParams } from "react-router-dom";
import service from "@/services";

export default function useVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleLogin = () => {
    navigate(PATHS.LOGIN);
  };

  const { isPending, isSuccess, isError } = service.auth.signup.verify(token);

  return {
    token,
    isPending,
    isSuccess,
    isError,
    handleLogin,
  };
}
