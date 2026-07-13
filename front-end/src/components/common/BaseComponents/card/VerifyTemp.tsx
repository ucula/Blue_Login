import React from "react";
import { PageContainer } from "../layout";
import { BaseCard } from "./BaseCard";
import { StatusCard } from "./StatusCard";

interface VerifyTempProps {
  isPending: boolean;
  isSuccess?: boolean;
  isError: boolean;
  onButtonClick: () => void;
  successTitle?: string;
  successDescription?: React.ReactNode;
  pendingTitle?: string;
  pendingDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
  buttonText?: string;
}

export function VerifyTemp({
  isPending,
  isSuccess,
  isError,
  onButtonClick,
  successTitle = "Account Verified!",
  successDescription = "Your email has been successfully verified. You can now log in to your account.",
  pendingTitle = "Verifying Account...",
  pendingDescription = "Please wait while we verify your email token.",
  errorTitle = "Verification Failed",
  errorDescription = "The verification token is invalid, expired, or has already been used.",
  buttonText = "Go to Login",
}: VerifyTempProps) {
  return (
    <PageContainer>
      <BaseCard>
        {isPending && (
          <StatusCard
            type="pending"
            title={pendingTitle}
            description={pendingDescription}
          />
        )}

        {isSuccess && (
          <StatusCard
            type="success"
            title={successTitle}
            description={successDescription}
            buttonText={buttonText}
            onButtonClick={onButtonClick}
          />
        )}

        {isError && (
          <StatusCard
            type="error"
            title={errorTitle}
            description={errorDescription}
            buttonText="Back to Login"
            onButtonClick={onButtonClick}
          />
        )}
      </BaseCard>
    </PageContainer>
  );
}
