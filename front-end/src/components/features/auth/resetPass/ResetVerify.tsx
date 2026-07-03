import useVerify from "./useResetVerify";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/config/path";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard, StatusCard } from "@/components/common/baseComponents/card";

export default function ResetVerify() {
  const { isPending, isError } = useVerify();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(PATHS.LOGIN);
  };

  return (
    <PageContainer>
      <BaseCard>
        {isPending && (
          <StatusCard
            type="pending"
            title="Verifying Account..."
            description="Please wait while we verify your email token."
          />
        )}

        {isError && (
          <StatusCard
            type="error"
            title="Verification Failed"
            description="The verification token is invalid, expired, or has already been used."
            buttonText="Back to Login"
            onButtonClick={handleLogin}
          />
        )}
      </BaseCard>
    </PageContainer>
  );
}
