import { useFetch } from "@/utility/useFetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/constants";
import type { User } from "@/types/user/user";

export function delUserById(id: string) {
  return useMutation({
    mutationFn: async () => {
      return await useFetch(API.USER_BY_ID(id), "DELETE");
    },
  });
}

export function fetchUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await useFetch(API.USER_BY_ID(id), "GET");
      return data;
    },
  });
}

export function fetchUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await useFetch(API.USERS, "GET");
      return data;
    },
  });
}

export function patchUserById(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      return await useFetch<void>(
        API.USER_BY_ID(id),
        "PATCH",
        { updatedData },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}

export function postUser() {
  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      return await useFetch<void>(
        API.USERS,
        "POST",
        user,
      );
    },
  });
}
