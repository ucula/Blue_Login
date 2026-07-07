import { useLocation } from "react-router-dom";

export default function useSend() {
  const location = useLocation();
  const email = location.state?.email || "";

  return { email };
}
