import {
  LogIn,
  UserPlus,
  FileSearch,
  MapPinPlus,
  FilePenLine,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login"); // Redirect to login page after logout
  };

  // Extract common NavLink styles to reduce repetition
  const getLinkStyles = ({ isActive }) =>
    isActive
      ? "flex flex-row gap-2 justify-center items-center p-4 rounded-lg bg-accentGold text-black"
      : "flex flex-row gap-2 justify-center items-center p-4 rounded-lg bg-primary hover:bg-accentGold hover:text-black text-white";

  return (
    <div className="fixed w-screen z-30 flex flex-row justify-between items-center bg-primary p-4">
      <div className="flex p-2 justify-center items-center gap-2 border rounded-lg bg-white ml-8 text-primary">
        <img
          src="./climap.png"
          className="h-8 w-8 rounded-md"
          alt="Climap logo"
        />
        <p className="font-bold">Climap</p>
      </div>
      {authenticated && (
        <div className="flex flex-row justify-between w-1/2 mr-8">
          <NavLink to="/browse" className={getLinkStyles}>
            <FileSearch />
            Browse Facilities
          </NavLink>
          <NavLink to="/addFacility" className={getLinkStyles}>
            <MapPinPlus />
            Add Facility
          </NavLink>
          <NavLink to="/" className={getLinkStyles}>
            <FilePenLine />
            Request Modification
          </NavLink>
          <button
            onClick={logOut}
            className="flex flex-row gap-2 justify-center items-center p-4 rounded-lg bg-primary hover:bg-accentGold hover:text-black text-white"
          >
            <LogOut />
            Logout
          </button>
        </div>
      )}

      {!authenticated && (
        <div className="flex flex-row justify-between gap-8 mr-8 font-bold">
          <NavLink
            to="/login"
            className="flex flex-row gap-2 justify-center items-center text-white hover:bg-accentGold p-4 rounded-lg hover:text-black"
          >
            <LogIn />
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="flex flex-row gap-2 justify-center items-center bg-accentGold p-4 rounded-lg text-black"
          >
            <UserPlus />
            Register
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
