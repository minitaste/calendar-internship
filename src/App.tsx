import { useState } from "react";
import { User } from "firebase/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListMode from "./pages/ListMode";
import CalendarMode from "./pages/CalendarMode";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} setUser={setUser}>
              <ListMode user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute user={user} setUser={setUser}>
              <CalendarMode user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
