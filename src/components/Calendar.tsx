import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Todo } from "../shared/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EditTodo from "./EditTodo";

const Calendar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "todos"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr: Todo[] = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id } as Todo);
      });
      setTodos(todosArr);
    });
    return unsubscribe;
  }, [userId]);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setIsFormVisible(true);
  };

  const handleEventClick = (info: any) => {
    const clickedTodo = info.event.extendedProps.todo;
    setEditingTodo(clickedTodo);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const closeEditingForm = () => {
    setEditingTodo(null);
  };

  const events = todos.map((todo) => ({
    title: todo.name,
    start: todo.date,
    allDay: true,
    extendedProps: { todo },
  }));

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {isFormVisible && (
        <CreateTodo
          onClose={closeForm}
          userId={userId}
          selectedDate={selectedDate}
        />
      )}

      {editingTodo && <EditTodo todo={editingTodo} onClose={closeEditingForm} />}
    </div>
  );
};

export default Calendar;
