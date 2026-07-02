import useSend from "./useSignupSend";
import SendTemp from "@/components/common/baseComponents/sendTemp/sendTemp";

export default function showSend() {
  const { email } = useSend();
  return <SendTemp email={email} path="/signup" />;
}
