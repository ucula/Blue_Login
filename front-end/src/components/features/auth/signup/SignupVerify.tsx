import useVerify from "./useSignupVerify";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard, StatusCard } from "@/components/common/baseComponents/card";

export default function SignupVerify() {
  const { isPending, isSuccess, isError, handleLogin } = useVerify();
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

        {isSuccess && (
          <StatusCard
            type="success"
            title="Account Verified!"
            description={
              <>
                Your email has been successfully verified.
                <br />
                You can now log in to your account.
              </>
            }
            buttonText="Go to Login"
            onButtonClick={handleLogin}
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
