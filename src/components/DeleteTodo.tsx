import { doc, deleteDoc } from "firebase/firestore";
import { Todo } from "../shared/types";
import { db } from "../../firebase/firebaseConfig";
import { TrashIcon } from "@heroicons/react/24/solid";

type Props = {
  todo: Todo;
  onClose: () => void;
};

const DeleteTodo = ({ todo, onClose }: Props) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "todos", todo.id));
      onClose();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-bold">Confirm Delete</h2>
        <p>Are you sure you want to delete "{todo.name}"?</p>
        <div className="flex justify-end mt-4 space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete<TrashIcon className="size-6 ml-1 inline"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodo;
