import { signOut, User } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

type Props = {
  user: User | null;
  setUser: (value: User | null) => void;
};

const LogOut = ({ user, setUser }: Props) => {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-between">
      <p className="text-2xl font-bold text-blue-950">Welcome {user ? user.displayName : ""}</p>

      <button
        onClick={handleLogOut}
        className="bg-red-900 px-4 py-2 rounded-md text-white"
      >
        LogOut
      </button>
    </div>
  );
};

export default LogOut;
