import useSend from "@/components/features/user/addUser/send/useSend";
import SendTemp from "@/components/common/baseComponents/sendTemp/sendTemp";

export default function showSend() {
  const { email } = useSend();
  return <SendTemp email={email} path="/admin/add" />;
}
