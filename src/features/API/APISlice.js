const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");
export const APISlice = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://lws-fake-product-api-json-server-production.up.railway.app",
  }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    fetchTodos: builder.query({
      query: (params) => {
        const { completed, color } = params || {};
        let queryCompleted = "";
        if (completed === "true" || completed === "false") {
          queryCompleted = `completed=${completed}`;
        }
        let queryColor = "";
        if (color) {
          queryColor = `&color=${color}`;
        }
        return `todos?${queryCompleted}${queryColor}`;
      },
      providesTags: ["todos"],
    }),

    createTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
    allTaskCompleted: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed: true },
      }),

      invalidatesTags: ["todos"],
    }),
    clearCompleted: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAllTaskCompletedMutation,
  useClearCompletedMutation,
} = APISlice;
