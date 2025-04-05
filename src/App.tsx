import React, { useCallback } from "react";
import OnLoading from "./components/OnLoading";
import Post from "./components/Post";
import { usePostAuthor, useSomeData } from "./queries/use-some-data";
import {debounce} from "lodash";
import PostForm from "./components/PostForm";

function App() {
  const [postAuthorFilter, setPostAuthorFilter] = React.useState<string>("");
  const { data, isLoading, error } = useSomeData({ waitTime: 700 });
  const {data: postAuthor } = usePostAuthor({authorFilter: postAuthorFilter})

  const debouncedSetFilter = useCallback(
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setPostAuthorFilter(e.target.value)
    }, 500),
    []
  );

  if(isLoading) return <OnLoading />;
  if(error) return <div>{JSON.stringify(error.message)}</div>;


  return (
    <>
      {data?.length === 0 || !data && (
        <div>No data to display</div>
      )}
      {data!.length > 0 && (
        <div>{data!.map((post) => <Post post={post}/>)}</div>
      )}
      <div>tanstack query</div>
      <input type="text" placeholder="Type post filter" onChange={(event) => debouncedSetFilter(event)}/>
      {postAuthor && (
        <div>
          Selected Post Authors: {postAuthor.map((a, i) => 
          <p className="author-name" key={i}>
            {a}
          </p>)}
        </div>
      )}
      <PostForm />
    </>
  );
}

export default App;
