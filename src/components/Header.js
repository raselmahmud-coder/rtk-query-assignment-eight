import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useCreateTodoMutation,
  useAllTaskCompletedMutation,
} from "../features/API/APISlice";

export default function Header() {
  const [input, setInput] = useState("");
  const [createTodo, { isLoading, isError }] = useCreateTodoMutation();
  const [
    allTaskCompleted,
    { isLoading: isUpdateLoading, isError: isUpdateError },
  ] = useAllTaskCompletedMutation();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      text: input,
      complete: false,
    };
    createTodo(data);
    setInput("");
  };

  const completeHandler = () => {
    allTaskCompleted();
  };

  const clearHeandler = () => {};

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={submitHandler}>
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          required
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={input}
          onChange={handleInput}
        />
        {isLoading ? (
          "Loading..."
        ) : (
          <button
            disabled={isLoading}
            type="submit"
            className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}></button>
        )}
      </form>
      {isError && (
        <div className="text-red-400 text-xl">There was an error ocurred</div>
      )}
      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer" onClick={completeHandler}>
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={clearHeandler}>
          Clear completed
        </li>
      </ul>
      {isUpdateLoading && (
        <div className="text-green-500 text-xs">Loading...</div>
      )}
      {isUpdateError && (
        <div className="text-red-500 text-xs">
          There is error occurred during update
        </div>
      )}
    </div>
  );
}
