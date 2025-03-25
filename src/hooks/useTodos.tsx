import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { Todo } from "../shared/types";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [importanceFilter, setImportanceFilter] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "todos"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr: Todo[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Todo[];

      setTodos(todosArr);
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    let filtered = todos;

    if (searchQuery.trim()) {
      filtered = filtered.filter((todo) =>
        todo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (importanceFilter) {
      filtered = filtered.filter(
        (todo) => todo.importance === importanceFilter
      );
    }

    setFilteredTodos(filtered);
  }, [todos, searchQuery, importanceFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterByImportance = (importance: string) => {
    setImportanceFilter(importance);
  };

  return {
    todos,
    filteredTodos,
    userId,
    handleSearch,
    handleFilterByImportance,
  };
};
