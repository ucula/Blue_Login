import { PATHS } from "@/constants";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import service from "@/services";

export default function useVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { isPending, isSuccess, isError, data } =
    service.auth.resetVerify(token);

  useEffect(() => {
    if (isSuccess) {
      const email = data?.data?.email;
      console.log(email);
      navigate(`${PATHS.USER_PASS}?token=${token}`, { state: { email } });
    }
  }, [isSuccess]);

  return {
    token,
    isPending,
    isSuccess,
    isError,
  };
}
