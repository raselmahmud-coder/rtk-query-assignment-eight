import { useSelector } from "react-redux";
import { useFetchTodosQuery } from "../features/API/APISlice";
import Todo from "./Todo";

export default function TodoList() {
  const { completed, color } = useSelector((state) => state.statusFilter);
  const params = { completed, color };
  const {
    data: Todos,
    isError,
    isLoading,
    isFetching,
  } = useFetchTodosQuery(params);

  // decide what to render
  let content = null;
  if (isLoading || isFetching) {
    content = <div className="loader text-xl text-blue-300">Loading...</div>;
  } else if (isError) {
    content = <div className="text-2x text-red-500">Something went wrong</div>;
  } else if (Todos.length === 0) {
    content = <div className="text-2x text-red-500">No todos</div>;
  } else if (Todos.length > 0) {
    content = Todos.map((todo) => <Todo key={todo.id} todo={todo} />);
  }
  return (
    <>
      <div className="my-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
        {content}
      </div>
    </>
  );
}
