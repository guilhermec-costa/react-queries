import { useQuery } from "@tanstack/react-query";
import { getDogsPaginated } from "../api/json-server-client";

export default function useDogsData(page: number) {
  return useQuery({
    queryKey: ["dogs", page],
    queryFn: () => getDogsPaginated(page),
  });
}