import { useSelector } from "react-redux";

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

export default function FooterCompletedTask() {
    const todos = useSelector((state) => state.todos);
    const todosRemaining = todos.filter((todo) => todo.completed).length;


    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>{numberOfTodos(todosRemaining)} Completed</p>
            
        </div>
    );
}
