import { User } from "firebase/auth";
import ListTodos from "../components/ListTodos"
import LogOut from "../components/LogOut";

type CalendarModeProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const ListMode = ({ user, setUser }: CalendarModeProps) => {
  return (
    <div className="px-8 my-5">
      <LogOut user={user} setUser={setUser} />
      <ListTodos />
    </div>
  );
};

export default ListMode