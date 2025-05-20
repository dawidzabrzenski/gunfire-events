import { useQuery } from "@tanstack/react-query";
import { findAllCatgories as getCategories } from "./categoryApi";

export function useCategories() {
  const {
    isPending: isCategoriesPending,
    data: categories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { isCategoriesPending, categoriesError, categories };
}
