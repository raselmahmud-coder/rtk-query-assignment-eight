import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFetchTodosQuery } from "../features/API/APISlice";
import {
  colorChange,
  statusChange,
} from "../features/filters/statusFilterSlice";

const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return "No task";
    case 1:
      return "1 task";
    default:
      return `${no_of_todos} tasks`;
  }
};

export default function Footer() {
  const dispatch = useDispatch();
  const { data: Todos, isError, isLoading } = useFetchTodosQuery();
  const [status, setStatus] = useState("All");
  const [colors, setColors] = useState([]);

  const handleStatusChange = (status) => {
    if (status === "Complete") {
      setStatus("Complete");
      dispatch(statusChange("true"));
    }
    if (status === "Incomplete") {
      setStatus("Incomplete");
      dispatch(statusChange("false"));
    }
    if (status === "All") {
      setStatus("All");
      dispatch(statusChange(""));
    }
  };
  const handleColorChange = (color) => {
    if (colors.includes(color)) {
      setColors([]);
      dispatch(colorChange(""));
    } else {
      if (color === "red") {
        setColors(["red"]);
        dispatch(colorChange("red"));
      }
      if (color === "green") {
        setColors(["green"]);
        dispatch(colorChange("green"));
      }
      if (color === "yellow") {
        setColors(["yellow"]);
        dispatch(colorChange("yellow"));
      }
    }
  };

  const todosRemaining = Todos?.filter((todo) => !todo.completed).length;
  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>
        {isLoading ? "Loading..." : `${numberOfTodos(todosRemaining)} left`}
      </p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "All" && "font-bold"}`}
          onClick={() => handleStatusChange("All")}>
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Incomplete" && "font-bold"}`}
          onClick={() => handleStatusChange("Incomplete")}>
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Complete" && "font-bold"}`}
          onClick={() => handleStatusChange("Complete")}>
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && "bg-green-500"
          }`}
          onClick={() => handleColorChange("green")}></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && "bg-red-500"
          }`}
          onClick={() => handleColorChange("red")}></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") && "bg-yellow-500"
          }`}
          onClick={() => handleColorChange("yellow")}></li>
      </ul>
      {isError && (
        <div className="text-xl text-red-500">There is error occurred</div>
      )}
    </div>
  );
}
