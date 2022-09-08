import { useDispatch } from "react-redux";
import cancelImage from "../assets/images/cancel.png";
import pen from "../assets/images/pen.png";
import { useState } from "react";

export default function Todo({ todo }) {
  const { text, id, completed, color } = todo || {};
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(text);

  const handleStatusChange = (todoId) => {
  };

  const handleColorChange = (todoId, color) => {
  };

  const handleDelete = (todoId) => {
  };
  const handleEdit = (e, todoId) => {
    e.preventDefault();
    setIsEdit(false);
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleStatusChange(id)}
          className="opacity-0 absolute rounded-full"
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      {isEdit ? (
        <form onSubmit={(e) => handleEdit(e, id)} className="w-full">
          <div className="flex justify-between">
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <div>
              <button
                type="submit"
                className="bg-green-300 px-3 py-1 rounded-full">
                Submit
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
          <img
            onClick={() => setIsEdit(true)}
            src={pen}
            alt=""
            className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
          />

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
              color === "green" && "bg-green-500"
            }`}
            onClick={() => handleColorChange(id, "green")}></div>

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
              color === "yellow" && "bg-yellow-500"
            }`}
            onClick={() => handleColorChange(id, "yellow")}></div>

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
              color === "red" && "bg-red-500"
            }`}
            onClick={() => handleColorChange(id, "red")}></div>

          <img
            src={cancelImage}
            className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
            alt="Cancel"
            onClick={() => handleDelete(id)}
          />
        </>
      )}
    </div>
  );
}
