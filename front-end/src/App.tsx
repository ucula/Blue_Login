import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllInfo from "./pages/allInfo";
import EditUser from "./pages/editUser";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ResetPass from "./pages/resetPass";
import Home from "./pages/home";
import AddUser from "./pages/addUser";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-pass" element={<ResetPass />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/brief" element={<Home />} />
          <Route path="/info/:id" element={<AllInfo />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
