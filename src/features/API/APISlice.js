const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");
export const APISlice = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lws-fake-product-api-json-server.onrender.com",
  }),
    tagTypes: ["todos"],
    endpoints: (builder) => ({
        fetchTodos: builder.query({
            query: () => "/todos",
            providesTags: ["todos"],
        }),
    }),
});

export const {useFetchTodosQuery} = APISlice;
