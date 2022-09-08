import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoCompletedTask from "./TodoCompletedTask";

export default function TodoListCompletedTask() {
  const todos = useSelector((state) => state.todos);


  const filterByCompleteTask = (todo) => {
    return todo.completed;
  };

  return (
    <>
      <div className="my-3 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
        {todos.filter(filterByCompleteTask).map((todo) => (
          <TodoCompletedTask todo={todo} key={todo.id} />
        ))}
      </div>
    </>
  );
}
