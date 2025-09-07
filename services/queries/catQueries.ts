import { useInfiniteQuery } from "@tanstack/react-query";
import { catApi } from "../catApi";

export const useCatBreeds = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ["catBreeds"],
    queryFn: ({ pageParam = 0 }) =>
      catApi.getBreeds({ limit: pageSize, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      // If the last page is empty or has fewer items than the page size,
      // we've reached the end of the list
      if (lastPage.length < pageSize) {
        return undefined;
      }
      // Return the next page number (0-based)
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
