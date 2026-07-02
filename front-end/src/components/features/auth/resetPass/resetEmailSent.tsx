import useSend from "./useResetSend";
import SendTemp from "@/components/common/baseComponents/sendTemp/sendTemp";

export default function showSend() {
  const { email } = useSend();
  return <SendTemp email={email} path="/reset" />;
}
