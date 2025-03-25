import { User } from "firebase/auth";
import GoogleAuthentication from "./GoogleAuthentication";
import { JSX } from "react";

type ProtectedRouteProps = {
  user: User | null;
  setUser: (user: User | null) => void;
  children: JSX.Element;
};

const ProtectedRoute = ({ user, setUser, children }: ProtectedRouteProps) => {
  if (!user) {
    return <GoogleAuthentication setUser={setUser} />;
  }
  return children;
};

export default ProtectedRoute;
