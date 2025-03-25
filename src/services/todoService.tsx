import { Todo } from "../shared/types";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const toggleComplete = async (todo: Todo) => {
  try {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed, 
    });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (id: Todo["id"]) => {
  try {
    await deleteDoc(doc(db, "todos", id));
  } catch (error) {
    console.error(error);
  }
};
