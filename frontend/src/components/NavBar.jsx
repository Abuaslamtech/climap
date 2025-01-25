import {
  LogIn,
  UserPlus,
  FileSearch,
  MapPinPlus,
  FilePenLine,
  LogOut,
  Menu,
  X,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const NavMenuItem = ({ to, icon: Icon, children, onClick }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3 p-3 rounded-lg transition-all duration-300
        ${
          isActive
            ? "bg-accentGold text-black"
            : "text-white hover:bg-accentGold/20 hover:text-accentGold"
        }
      `}
      onClick={() => {
        setIsMobileMenuOpen(false);
        onClick?.();
      }}
    >
      <Icon size={20} />
      <span className="text-base">{children}</span>
    </NavLink>
  );

  return (
    <nav className=" fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="flex items-center justify-between p-4 ">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="./climap.png"
            className="h-8 w-8 rounded-md"
            alt="Climap logo"
          />
          <span className="font-bold text-white text-lg">Climap</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {authenticated ? (
            <>
              <NavMenuItem to="/browse" icon={FileSearch}>
                Browse Facilities
              </NavMenuItem>
              <NavMenuItem to="/addFacility" icon={MapPinPlus}>
                Add Facility
              </NavMenuItem>
              <NavMenuItem to="/" icon={FilePenLine}>
                Request Modification
              </NavMenuItem>
              <NavMenuItem to="/about" icon={Target}>
                About
              </NavMenuItem>
              <button
                onClick={logOut}
                className="flex items-center gap-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <NavMenuItem to="/about" icon={Target}>
                About
              </NavMenuItem>
              <NavMenuItem to="/login" icon={LogIn}>
                Login
              </NavMenuItem>
              <NavMenuItem to="/register" icon={UserPlus}>
                Register
              </NavMenuItem>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white z-50"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Slide-out */}
      <div
        className={`
        md:hidden fixed inset-0 bg-primary transform transition-transform duration-300
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        pt-16 p-6 flex flex-col gap-4 z-40
      `}
      >
        {authenticated ? (
          <>
            <NavMenuItem to="/browse" icon={FileSearch}>
              Browse Facilities
            </NavMenuItem>
            <NavMenuItem to="/addFacility" icon={MapPinPlus}>
              Add Facility
            </NavMenuItem>
            <NavMenuItem to="/" icon={FilePenLine}>
              Request Modification
            </NavMenuItem>
            <NavMenuItem to="/about" icon={Target}>
              About
            </NavMenuItem>
            <button
              onClick={logOut}
              className="flex items-center gap-3 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <NavMenuItem to="/about" icon={Target}>
              About
            </NavMenuItem>
            <NavMenuItem to="/login" icon={LogIn}>
              Login
            </NavMenuItem>
            <NavMenuItem to="/register" icon={UserPlus}>
              Register
            </NavMenuItem>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
