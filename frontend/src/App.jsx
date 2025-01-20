import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import AddFacility from "./pages/AddFacility";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import ProtectedRoute from "./utils/ProtectedRoute";

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
    </Routes>
  );
}

export default App;
