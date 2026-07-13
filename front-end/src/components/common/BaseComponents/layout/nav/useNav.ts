import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_NAME } from "@/config";
import { PATHS } from "@/constants";
import { decodeToken } from "@/utility";

export default function useNav() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const token = localStorage.getItem(TOKEN_NAME);
  const decoded = token ? decodeToken(token) : null;
  const username = decoded?.username;
  const email = decoded?.email;
  const icon = username.trim()[0].toUpperCase();

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

  return {
    open,
    anchorEl,
    username,
    email,
    icon,
    handleClose,
    handleClick,
    handleLogout,
  };
}
