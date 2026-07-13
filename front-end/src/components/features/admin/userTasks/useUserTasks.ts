import { MONTHS, NUM_OF_BOXES_PER_ROW } from "@/constants";
import { useMemo, useState } from "react";
import { getDaysCount, getDates } from "@/utility/date";
import service from "@/services";
import { useParams, useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";

export default function useUserTasks() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch target user's details
  const { data: user } = service.admin.fetchUserById(String(id));

  // Date setup
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

  const NUM_ROW = Math.ceil(daysInMonth / NUM_OF_BOXES_PER_ROW);
  const BOX_SPACE = 12 / NUM_OF_BOXES_PER_ROW;

  // Fetch user's tasks
  const { data: dbBoxes, isLoading, isError: queryError } = service.admin.useGetUserTasks(
    String(id),
    selectedYear,
    selectedMonth,
  );

  const isError = queryError || (dbBoxes !== undefined && dbBoxes.length === 0);

  const boxForm = useMemo(() => {
    if (!dbBoxes) return {};
    const form: Record<number, string> = {};
    dbBoxes.forEach((box: any) => {
      form[box.date.day] = box.value;
    });
    return form;
  }, [dbBoxes]);

  const isPrevDisabled =
    selectedMonth === 0 && selectedYear === currentYear - 10;
  const isNextDisabled = selectedMonth === 11 && selectedYear === currentYear;

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (isNextDisabled) return;
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (id) {
      navigate(PATHS.ADMIN_USER_INFO.build(id));
    } else {
      navigate(PATHS.ADMIN_HOME);
    }
  };

  return {
    user,
    isLoading,
    isError,
    daysInMonth,
    NUM_ROW,
    NUM_OF_BOXES_PER_ROW,
    BOX_SPACE,
    boxForm,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    handlePrevMonth,
    handleNextMonth,
    yearOptions,
    monthOptions,
    isPrevDisabled,
    isNextDisabled,
    handleBack,
  };
}
