interface PostProps {
  post: Post
};

export default function Post({post}: PostProps) {
  return <div>
    Post {post.id}, by {post.author}
    Tags: {post.tags}
  </div>
}