import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle logout
  const handleLogout = () => {
    logout();            // clear token
    navigate("/");       // redirect to login
  };

  return (
    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      {/* Logo / Title */}
      <h1 className="text-xl font-bold text-blue-600">
        LMS
      </h1>

      {/* Navigation Links */}
      {token && (
        <div className="flex gap-4 items-center">

          <Link to="/courses" className="hover:text-blue-500">
            Courses
          </Link>

          <Link to="/my-courses" className="hover:text-blue-500">
            My Courses
          </Link>

          <Link to="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default Navbar;