import { POSTS } from "../data-util";

export function createPost(post: Post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Adding post");
      POSTS.push(post);
      resolve(post);
    }, 0);
  })
}