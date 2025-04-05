import { useQuery } from "@tanstack/react-query";
import { wait } from "../util";
import { POSTS } from "../data-util";

type UseSomeDataProps = {
  waitTime?: number;
};

interface UsePostsProps {
  authorFilter?: string;
}

export function useSomeData({ waitTime = 2000 }: UseSomeDataProps) {
  return useQuery({
    queryKey: ["posts"],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: async ({queryKey}) => wait(waitTime).then(() => {
      return [...POSTS];
    }),
  });
}

export function usePostAuthor({ authorFilter }: UsePostsProps) {
  return useQuery({
    queryKey: ["posts", authorFilter],
    queryFn: async () => {
      return Promise.resolve(POSTS.filter((p) => p.author.includes(authorFilter!)).map((a) => a.author));
    },
    enabled: !!authorFilter,
  });
}
