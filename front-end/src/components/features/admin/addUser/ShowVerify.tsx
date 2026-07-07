import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard, StatusCard } from "@/components/common/baseComponents/card";
import useVerify from "./useVerify";
import { useNavigate } from "react-router-dom";

export default function showVerify() {
  const { isPending, isError } = useVerify();
  const navigate = useNavigate();

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
            onButtonClick={() => navigate("/login")}
          />
        )}
      </BaseCard>
    </PageContainer>
  );
}


