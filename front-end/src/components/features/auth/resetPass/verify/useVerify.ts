import service from "@/services";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isPending, isSuccess, isError, data } =
    service.auth.reset.newPassVerify(token);

  const redirectReset = () => {
    const email = data?.data?.email;
    navigate("/reset/pass", { state: { email } });
  };

  return {
    token,
    isPending,
    isSuccess,
    isError,
    redirectReset,
  };
}
