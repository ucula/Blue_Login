import useVerify from "./useVerify";
import { useNavigate } from "react-router-dom";
import { VerifyTemp } from "@/components/common/baseComponents/card";

export default function showVerify() {
  const { isPending, isError } = useVerify();
  const navigate = useNavigate();

  return (
    <VerifyTemp
      isPending={isPending}
      isError={isError}
      onButtonClick={() => navigate("/login")}
    />
  );
}


