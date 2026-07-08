import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_NAME } from "@/config";
import { PATHS } from "@/config/path";

export default function useNav() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    setAnchorEl(null);
    localStorage.removeItem(TOKEN_NAME);
    navigate(PATHS.LOGIN);
  }, [navigate]);

  return { open, anchorEl, handleClose, handleClick, handleLogout };
}
