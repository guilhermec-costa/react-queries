import { useInfiniteQuery } from "@tanstack/react-query";
import { getDogsPaginated } from "../api/json-server-client";

export default function useInfiniteDogScroll() {
  return useInfiniteQuery({
    queryKey: ["dogs", "infinite"],
    getNextPageParam: (prevData: DogPaginationResponse) => prevData.next,
    initialPageParam: 1,
    queryFn: ({pageParam = 1}) => getDogsPaginated(pageParam),
  });
}