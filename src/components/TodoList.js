import { useFetchTodosQuery } from "../features/API/APISlice";
import Todo from "./Todo";

export default function TodoList() {
  const { data: Todos, isError, isLoading } = useFetchTodosQuery();
  console.log(Todos);

  /*   const filterByStatus = (todo) => {
    const { status } = filters;
    switch (status) {
      case "Complete":
        return todo.completed;

      case "Incomplete":
        return !todo.completed;

      default:
        return true;
    }
  };
  const filterByInCompleteTask = (todo) => {
    return !todo.completed;
  };
  const filterByColors = (todo) => {
    const { colors } = filters;
    if (colors.length > 0) {
      return colors.includes(todo?.color);
    }
    return true;
  }; */

  // decide what to render
  let content = null;
  if (isLoading) {
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
