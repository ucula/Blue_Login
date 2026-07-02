import { sendEmail } from "@/services/base/sendEmail";

export default function useSendTemp(email: string, path: string) {
  const { mutate: send, isPending } = sendEmail();
  const handleSendEmail = () => {
    send(
      { email, path },
      {
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };
  return { isPending, handleSendEmail };
}
