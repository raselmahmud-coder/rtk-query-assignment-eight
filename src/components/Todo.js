import cancelImage from "../assets/images/cancel.png";
import pen from "../assets/images/pen.png";
import { useState } from "react";
import {
  useDeleteTodoMutation,
  useFetchTodosQuery,
  useUpdateTodoMutation,
} from "../features/API/APISlice";
import Spinner from "../Utils/Loader/Spinner";

export default function Todo({ todo }) {
  const { text, id, completed, color } = todo || {};
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(text);
  const [eventFire, setEventFire] = useState("");
  const [updateTodo, { isLoading, isError: isUpdateError }] =
    useUpdateTodoMutation();
  const [deleteTodo, { isLoading: deleteLoading, isError: isDeleteError }] =
    useDeleteTodoMutation();
  const { data: Todos } = useFetchTodosQuery();

  const handleStatusChange = async () => {
    setEventFire("update");
    await updateTodo({
      id,
      data: { completed: !completed },
    });
  };

  const handleColorChange = async (selectedColor) => {
    setEventFire("color");
    const findTodo = await Todos.find((todo) => +todo.id === +id);
    if (!findTodo.color) {
      await updateTodo({
        id,
        data: { color: selectedColor },
      });
    } else {
      await updateTodo({
        id,
        data: { color: selectedColor },
      });
    }
  };

  const handleDelete = () => {
    deleteTodo(id);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      text: value,
    };
    await updateTodo({ id, data });
    setIsEdit(false);
  };
  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}>
        {isLoading && eventFire === "update" ? (
          <Spinner classes={"w-5 h-5"} />
        ) : (
          <input
            type="checkbox"
            checked={completed}
            onChange={() => handleStatusChange(id)}
            className="opacity-0 absolute rounded-full cursor-pointer w-5 h-5"
          />
        )}
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      {isEdit ? (
        <form onSubmit={handleEdit} className="w-full">
          <div className="flex justify-between">
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="bg-green-300 px-3 py-1 rounded-full">
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="px-3 py-1 ml-2 rounded-full bg-red-300">
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className={`select-none flex-1 ${completed && "line-through"}`}>
            {text}
          </div>
          {isUpdateError && (
            <div className="text-red-500 text-xs">
              There is error occurred during update
            </div>
          )}
          {isDeleteError && (
            <div className="text-red-500 text-xs">
              There is error occurred during update
            </div>
          )}
          <img
            onClick={() => setIsEdit(true)}
            src={pen}
            alt=""
            className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
          />

          {isLoading && eventFire === "color" ? (
            <div className="text-xs">Loading...</div>
          ) : (
            <>
              <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                  color === "green" && "bg-green-500"
                }`}
                onClick={() => handleColorChange("green")}></div>

              <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                  color === "yellow" && "bg-yellow-500"
                }`}
                onClick={() => handleColorChange("yellow")}></div>

              <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                  color === "red" && "bg-red-500"
                }`}
                onClick={() => handleColorChange("red")}></div>
            </>
          )}

          {deleteLoading ? (
            "Loading..."
          ) : (
            <img
              src={cancelImage}
              className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
              alt="Cancel"
              onClick={() => handleDelete(id)}
            />
          )}
        </>
      )}
    </div>
  );
}
