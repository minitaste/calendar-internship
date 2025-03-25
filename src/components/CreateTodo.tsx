import { useState } from "react";
import { Todo } from "../shared/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

type Props = {
  onClose: () => void;
  selectedDate: string;
  userId: string | null;
};

const CreateTodo = ({ userId, onClose, selectedDate }: Props) => {
  const [name, setName] = useState<Todo["name"]>("");
  const [description, setDescription] = useState<Todo["description"]>("");
  const [importance, setImportance] = useState<Todo["importance"]>("");
  const [date, setDate] = useState<Todo["date"]>(selectedDate);


  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "") {
      alert("Enter todo's name.");
      return;
    }
    await addDoc(collection(db, "todos"), {
      userId: userId,
      name: name,
      description: description,
      date: date,
      importance: importance,
      completed: false,
    });
    onClose();
  };

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal">
        <form onSubmit={createTodo} className="text-white">
          <div className="flex items-center justify-center">
            <h3 className="text-center text-2xl mb-8">
              Enter your Todo{" "}
              <PencilSquareIcon className="size-6 text-white inline mb-1" />
            </h3>
          </div>
          <label>Todo name</label>
          <input
            className="mt-2 mb-6 block w-full rounded-md  px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Todo name"
          />

          <label>Description</label>
          <textarea
            className="mt-2 mb-6 block w-full rounded-md  px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <label>Importance</label>
          <input
            className="mt-2 my-6 block w-full rounded-md  px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            type="text"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            placeholder="Importance"
          />
          <label>Date</label>
          <input
            className="mt-2 my-6 block w-full rounded-md  px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            type="submit"
            className="block mx-auto bg-gray-100 hover:bg-gray-300 text-stone-800 font-bold py-2 px-4 mt-2 rounded"
          >
            Submit Todo
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTodo;
