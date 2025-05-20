import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent as createEventApi } from "./eventApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    error: queryError,
  } = useMutation({
    mutationFn: ({ email, password }) => createEventApi(email, password),
    onSuccess: async (user) => {
      navigate("/dashboard", { replace: true });
    },
  });

  const error = queryError ? queryError.message : null;

  return { login, isPending, error };
}
