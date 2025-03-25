import { useState } from "react";
import { Todo } from "../shared/types";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

type Props = {
  todo: Todo;
  onClose: () => void;
};

const EditTodo = ({ todo, onClose }: Props) => {
  const [name, setName] = useState<Todo["name"]>(todo.name);
  const [description, setDescription] = useState<Todo["description"]>(
    todo.description
  );
  const [importance, setImportance] = useState<Todo["importance"]>(
    todo.importance
  );
  const updateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "") {
      alert("Enter todo's name.");
      return;
    }
    const todoRef = doc(db, "todos", todo.id);
    await updateDoc(todoRef, {
      name,
      description,
      importance,
    });
    onClose();
  };

  return (
    <section>
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal">
        <form onSubmit={updateTodo} className="text-white">
          <div className="flex items-center justify-center">
            <h3 className="text-center text-2xl mb-8">
              Edit Todo{" "}
              <PencilSquareIcon className="w-6 h-6 text-white inline mb-1" />
            </h3>
          </div>
          <label>Todo name</label>
          <input
            className="mt-2 mb-6 block w-full rounded-md px-3 py-1.5 text-base outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Todo name"
          />
          <label>Description</label>
          <textarea
            className="mt-2 mb-6 block w-full rounded-md px-3 py-1.5 text-base outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <label>Importance</label>
          <input
            className="mt-2 my-6 block w-full rounded-md px-3 py-1.5 text-base outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            type="text"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            placeholder="Importance"
          />
          <button
            type="submit"
            className="block mx-auto bg-gray-100 hover:bg-gray-300 text-stone-800 font-bold py-2 px-4 mt-2 rounded"
          >
            Update Todo
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditTodo;
