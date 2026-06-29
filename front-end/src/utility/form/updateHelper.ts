import type { Dispatch, SetStateAction } from "react";

export function updateHelper<T>(setEvent: Dispatch<SetStateAction<T>>) {
  return (label: string, value: string) => {
    setEvent((prev) => ({
      ...prev,
      [label]: value.trim(),
    }));
  };
}