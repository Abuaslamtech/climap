import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import AddFacility from "./pages/AddFacility";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import ProtectedRoute from "./utils/ProtectedRoute";
import ResetSuccess from "./pages/ResetSuccess";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/addfacility" element={<AddFacility />} />
      </Route>
      <Route path="/browse" element={<Browse />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/resetsuccess" element={<ResetSuccess />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
