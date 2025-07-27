import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuthenticated = Boolean(currentUser);

  console.log(isAuthenticated);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home/*"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
