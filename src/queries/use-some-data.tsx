import { useQuery } from "@tanstack/react-query";
import { wait } from "../util";
import { POSTS } from "../data-util";

type UseSomeDataProps = {
  waitTime?: number;
}

export default function useSomeData({waitTime = 2000}: UseSomeDataProps) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => wait(waitTime).then(() => [...POSTS]),
  });
}