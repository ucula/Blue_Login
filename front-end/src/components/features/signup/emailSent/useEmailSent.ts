import { useLocation } from "react-router-dom";

export default function useEmailSent() {
  const location = useLocation();
  const email = location.state?.email || "";

  return { email };
}
