import { MONTHS, NUM_OF_BOXES_PER_ROW } from "@/constants";
import { useMemo, useState, useEffect } from "react";
import { getDaysCount, getDates } from "@/utility/date";
import useConfirmModal from "@/components/common/baseComponents/modalAlert/useConfirmModal";
import service from "@/services";
import { useQueryClient } from "@tanstack/react-query";

export default function useHome() {
  const queryClient = useQueryClient();

  // modal
  const { modalRef: discardModalRef, openModal: openDiscardModal } =
    useConfirmModal();

  // date
  const { currentMonth, currentYear } = getDates();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const daysInMonth = getDaysCount(selectedYear, selectedMonth + 1);
  const YEARS = Array.from({ length: 11 }, (_, idx) => currentYear - idx);
  const yearOptions = YEARS.map((year) => ({ label: year, value: year }));
  const monthOptions = MONTHS.map((month, idx) => ({
    label: month,
    value: idx,
  }));

  // box generation
  const NUM_ROW = Math.ceil(daysInMonth / NUM_OF_BOXES_PER_ROW);
  const BOX_SPACE = 12 / NUM_OF_BOXES_PER_ROW;

  // fetch db data
  const { data: dbBoxes } = service.box.useGetBoxes(
    selectedYear,
    selectedMonth,
  );

  const dbForm = useMemo(() => {
    if (!dbBoxes) return {};
    const form: Record<number, string> = {};
    dbBoxes.forEach((box: any) => {
      form[box.date.day] = box.value;
    });
    return form;
  }, [dbBoxes]);

  // main logic
  const [boxForm, setBoxForm] = useState<Record<number, string>>({});

  useEffect(() => {
    setBoxForm(dbForm);
  }, [dbForm]);

  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const isEditing = useMemo(() => {
    const normalize = (obj: Record<number, string>) =>
      Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== undefined && v !== ""),
      );
    return (
      JSON.stringify(normalize(boxForm)) !== JSON.stringify(normalize(dbForm))
    );
  }, [boxForm, dbForm]);

  const isPrevDisabled =
    selectedMonth === 0 && selectedYear === currentYear - 10;
  const isNextDisabled = selectedMonth === 11 && selectedYear === currentYear;

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
    const action = () => {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear((prev) => prev - 1);
      } else {
        setSelectedMonth((prev) => prev - 1);
      }
      setBoxForm({});
    };

    if (isEditing) {
      setPendingAction(() => action);
      openDiscardModal();
    } else {
      action();
    }
  };

  const handleNextMonth = () => {
    if (isNextDisabled) return;
    const action = () => {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear((prev) => prev + 1);
      } else {
        setSelectedMonth((prev) => prev + 1);
      }
      setBoxForm({});
    };

    if (isEditing) {
      setPendingAction(() => action);
      openDiscardModal();
    } else {
      action();
    }
  };
  // save
  const { mutate: saveBoxes } = service.box.useSaveBoxes();

  const handleSave = () => {
    const payload = Object.entries(boxForm).map(([day, value]) => ({
      day: parseInt(day),
      value: value || "",
    }));

    saveBoxes(
      {
        year: selectedYear,
        month: selectedMonth,
        boxes: payload,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["boxes", selectedYear, selectedMonth],
          });
        },
      },
    );
  };

  const handleDiscard = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    } else {
      setBoxForm(dbForm);
    }
  };

  return {
    daysInMonth,
    NUM_ROW,
    NUM_OF_BOXES_PER_ROW,
    BOX_SPACE,
    boxForm,
    setBoxForm,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    handlePrevMonth,
    handleNextMonth,
    yearOptions,
    monthOptions,
    handleSave,
    handleDiscard,
    isEditing,
    openDiscardModal,
    discardModalRef,
    isPrevDisabled,
    isNextDisabled,
  };
}
