import { useRef } from "react";
import type { ConfirmModalRef } from "./modalAlert";

export default function useConfirmModal() {
  const modalRef = useRef<ConfirmModalRef>(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return {
    modalRef,
    openModal,
    closeModal,
  };
}
