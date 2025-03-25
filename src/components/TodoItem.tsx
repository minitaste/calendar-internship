import React from "react";
import { TodoItemProps } from "../shared/types";
import { TrashIcon } from "@heroicons/react/24/solid";

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  return (
    <li className="border rounded-md p-4">
      <h3 className="text-xl font-semibold">{todo.name}</h3>
      <p>{todo.description}</p>
      <p className="text-sm text-gray-600">Date: {todo.date}</p>
      <p className="text-sm text-gray-600">Importance: {todo.importance}</p>
      <div className="flex space-x-4 mt-2">
        <button
          onClick={() => onEdit(todo)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(todo)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
          <TrashIcon className="size-5 inline ml-1" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
