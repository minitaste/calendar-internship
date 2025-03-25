import Calendar from '../components/Calendar'
import LogOut from '../components/LogOut';
import { User } from 'firebase/auth';

type CalendarModeProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
          
const CalendarMode = ({ user, setUser }: CalendarModeProps) => {
  return (
    <div>
      <div className="px-8">
        <div className="my-5">
          <LogOut user={user} setUser={setUser} />
        </div>
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarMode