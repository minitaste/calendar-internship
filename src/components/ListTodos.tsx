import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../shared/types";
import CreateTodo from "./CreateTodo";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import Search from "./Search";
import TodoItem from "./TodoItem";


const ListTodos = () => {
  const { filteredTodos, handleSearch, handleFilterByImportance, userId } =
    useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [importanceFilter, setImportanceFilter] = useState<string>("");

  const handleImportanceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setImportanceFilter(event.target.value);
    handleFilterByImportance(event.target.value);
  };

  return (
      <div className="p-4">
          <div className="gap-x-2 flex justify-between">
      <Search onSearch={handleSearch} />
              
        <select
            value={importanceFilter}
            onChange={handleImportanceChange}
            className="px-3 py-2 border rounded-md mb-4"
        >
            <option value="">All</option>
            <option value="not-important">Not Important</option>
            <option value="important">Important</option>
            <option value="critical">Critical</option>
        </select>
          </div>


      <button
        onClick={() => {
          setSelectedDate("");
          setIsFormVisible(true);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
      >
        Create Todo
      </button>

      <h2 className="text-2xl font-bold mb-4">List of Todos</h2>
      <ul className="space-y-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={setEditingTodo}
              onDelete={setDeletingTodo}
            />
          ))
        ) : (
          <p className="mt-4 text-gray-500">No todos found.</p>
        )}
      </ul>

      {editingTodo && (
        <EditTodo todo={editingTodo} onClose={() => setEditingTodo(null)} />
      )}
      {deletingTodo && (
        <DeleteTodo todo={deletingTodo} onClose={() => setDeletingTodo(null)} />
      )}
      {isFormVisible && (
        <CreateTodo
          onClose={() => setIsFormVisible(false)}
          userId={userId}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default ListTodos;
