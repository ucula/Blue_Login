import { PATHS } from "@/config/path";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import service from "@/services";

export default function useVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isPending, isSuccess, isError, data } =
    service.auth.reset.verify(token);

  useEffect(() => {
    if (isSuccess) {
      const email = data?.data?.email;
      console.log(email);
      navigate(`${PATHS.RESET_PASSWORD}?token=${token}`, { state: { email } });
    }
  }, [isSuccess]);

  return {
    token,
    isPending,
    isSuccess,
    isError,
  };
}
