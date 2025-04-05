import React, { useCallback } from "react";
import OnLoading from "./components/OnLoading";
import Post from "./components/Post";
import { usePostAuthor, usePostData } from "./queries/use-some-data";
import { debounce } from "lodash";
import PostForm from "./components/PostForm";
import useDogsData from "./queries/use-dogs-data";

function App() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [postAuthorFilter, setPostAuthorFilter] = React.useState<string>("");
  const { data, isLoading, error } = usePostData({ waitTime: 700 });
  const { data: postAuthor } = usePostAuthor({
    authorFilter: postAuthorFilter,
  });
  const dogQuery = useDogsData(currentPage);
  console.log(dogQuery.data);

  const debouncedSetFilter = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      setPostAuthorFilter(e.target.value);
    }, 500),
    []
  );

  if (isLoading) return <OnLoading />;
  if (error) return <div>{JSON.stringify(error.message)}</div>;

  return (
    <>
      {data?.length === 0 || (!data && <div>No data to display</div>)}
      {data!.length > 0 && (
        <div>
          {data!.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
      <div>tanstack query</div>
      <input
        type="text"
        placeholder="Type post filter"
        onChange={(event) => debouncedSetFilter(event)}
      />
      {postAuthor && (
        <div>
          Selected Post Authors:{" "}
          {postAuthor.map((a, i) => (
            <p className="author-name" key={i}>
              {a}
            </p>
          ))}
        </div>
      )}
      <PostForm />
      <hr></hr>
      <h2>Paginated data</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {dogQuery.data &&
          dogQuery.data.data.map((dog) => {
            return (
              <div
                key={dog.id}
                className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-1">{dog.nome}</h2>
                <p className="text-gray-600">Raça: {dog.raca}</p>
                <p className="text-gray-600">Idade: {dog.idade} ano(s)</p>
                <p className="text-gray-600">Peso: {dog.pesoKg} kg</p>
                <div className="mt-2">
                  <span className="font-medium">Vacinas:</span>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    {dog.vacinas.map((vacina, index) => (
                      <li key={index}>{vacina}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <p>
                    <strong>Dono:</strong> {dog.dono.nome}
                  </p>
                  <p>
                    <strong>Contato:</strong> {dog.dono.telefone}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {dogQuery.data?.first && (
          <button
            onClick={() => setCurrentPage(dogQuery.data.first)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition"
            disabled={!dogQuery.data.prev}
          >
            ⏮ First
          </button>
        )}
        {dogQuery.data?.prev && (
          <button
            onClick={() => setCurrentPage(dogQuery.data.prev)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition"
          >
            ◀ Previous
          </button>
        )}
        {dogQuery.data?.next && (
          <button
            onClick={() => setCurrentPage(dogQuery.data.next)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition"
          >
            Next ▶
          </button>
        )}
        {dogQuery.data?.last && (
          <button
            onClick={() => setCurrentPage(dogQuery.data.last)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition"
          >
            Last ⏭
          </button>
        )}
        <div>
          Page {currentPage} of {dogQuery.data?.pages}
        </div>
      </div>
    </>
  );
}

export default App;
