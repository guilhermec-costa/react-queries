import { FormEvent, useRef } from "react";
import useNewPostMut from "../queries/new-post-mut";

export default function PostForm() {
  const authorRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const authorMut = useNewPostMut();

  function handleFormSubmission(e: FormEvent) {
    e.preventDefault();

    if (titleRef.current && contentRef.current && authorRef.current) {
      const newPost: Post = {
        id: Math.ceil(Math.random() * 10),
        title: titleRef.current?.value,
        content: contentRef.current?.value,
        author: authorRef.current?.value,
        createdAt: new Date().toISOString(),
        tags: ["Tech"],
      };

      authorMut.mutate(newPost);
    }
  }

  if(authorMut.data) {
    console.log(authorMut.data);
  }

  return (
    <div>
      <form
        onSubmit={handleFormSubmission}
        className="space-y-4 max-w-lg mx-auto"
      >
        <div>
          <label className="block font-medium mb-1">Título</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            ref={titleRef}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Conteúdo</label>
          <textarea
            className="w-full border p-2 rounded"
            required
            rows={4}
            ref={contentRef}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Autor</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            ref={authorRef}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar Post
        </button>
      </form>
    </div>
  );
}
