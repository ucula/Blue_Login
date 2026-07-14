import { useQuery, useMutation } from "@tanstack/react-query";
import { useFetch } from "@/utility/http/useFetch";
import { API } from "@/constants";

export function useGetBoxes(year: number, month: number) {
  return useQuery({
    queryKey: ["boxes", year, month],
    queryFn: async () => {
      const response = await useFetch(
        `${API.USER_BOX}?year=${year}&month=${month}`,
        "GET",
      );
      return response.data;
    },
    enabled: year > 0 && month >= 0,
  });
}

export function useSaveBoxes() {
  return useMutation({
    mutationFn: async ({
      year,
      month,
      boxes,
    }: {
      year: number;
      month: number;
      boxes: { day: number; value: string }[];
    }) => {
      return await useFetch(API.USER_BOX, "POST", { year, month, boxes });
    },
  });
}
