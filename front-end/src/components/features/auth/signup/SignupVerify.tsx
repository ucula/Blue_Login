import useVerify from "./useSignupVerify";
import { VerifyTemp } from "@/components/common/baseComponents/card";

export default function SignupVerify() {
  const { isPending, isSuccess, isError, handleLogin } = useVerify();
  return (
    <VerifyTemp
      isPending={isPending}
      isSuccess={isSuccess}
      isError={isError}
      onButtonClick={handleLogin}
    />
  );
}
