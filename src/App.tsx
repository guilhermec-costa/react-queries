import OnLoading from "./components/OnLoading";
import Post from "./components/Post";
import useSomeData from "./queries/use-some-data";

function App() {
  const { data, isLoading } = useSomeData({ waitTime: 700 });
  return (
    <>
      {isLoading && !data && (
        <OnLoading />
      )}
      {data && data.length > 0 && (
        <div>{data.map((post) => <Post post={post}/>)}</div>
      )}
      {!isLoading && (data?.length === 0 || !data) && (
        <div>No data to display</div>
      )}
      <div>tanstack query</div>
    </>
  );
}

export default App;
