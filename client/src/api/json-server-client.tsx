import axios from "axios"

export async function getDogsPaginated(page: number) {
  console.log("Getting dogs")
  const limit = 2;
  const data = await axios.get<DogPaginationResponse>("http://localhost:3000/dogs", {
      params: { _page: page, _per_page: limit },
  });
  return data.data;
}
