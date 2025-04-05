import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";

export default function useNewPostMut() {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (data, vars, ctx) => {
      console.log(ctx)
      // forces the cached/freshed data to become STALE
      // begin STALE means that react query can refetch the data
      // so the user experience gets much better this way
      queryClient.invalidateQueries({queryKey: ["posts"], exact: true})
    },
    mutationFn: createPost,
    onMutate: () => {
      console.log("Mutating posts data");
      const ctx =  { post: "added"};
      return ctx;
    },
  });
}
