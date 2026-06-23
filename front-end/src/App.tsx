import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllInfo from "@/pages/user/allInfo";
import EditUser from "@/pages/user/editUser";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup/main";
import EmailSent from "@/pages/auth/signup/emailSent";
import SignupVerify from "@/pages/auth/signup/verify";
import ResetPass from "@/pages/auth/resetPass";
import Home from "@/pages/user/home";
import AddUser from "@/pages/user/addUser";
import ProtectedRoute from "@/pages/auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-pass" element={<ResetPass />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/email-sent" element={<EmailSent />} />
        <Route path="/signup/verify" element={<SignupVerify />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/brief" element={<Home />} />
          <Route path="/info/:id" element={<AllInfo />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/info/:id/edit" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
