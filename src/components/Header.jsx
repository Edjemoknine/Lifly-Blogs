import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { PiUserCircleGearFill } from "react-icons/pi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
function Header({ user }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setOpen(false);
    });
    setOpen(false);
  }, [location]);

  const LogOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 p-2 relative z-50">
      <div className="container mx-auto  flex justify-between text-black text-xl items-center">
        <Link to={"/"} className="font-semibold text-white text-2xl">
          Lifly BLogs
        </Link>
        <ul
          className={`${
            open
              ? "flex shadow-lg text-white transition-all duration-300 absolute top-[110%]  right-4 bg-blue-400 w-96 h-96 gap-6 rounded-lg p-16 flex-col justify-start items-center"
              : "hidden  text-white absolute top-[110%]  transition-all duration-300 -right-full bg-blue-400 w-96 h-96 gap-6 rounded-lg p-16 flex-col justify-start items-center"
          } md:flex md:flex-row md:relative md:top-0 md:h-0 md:right-0 md:bg-inherit md:w-auto md:p-6`}
        >
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to={"/"} className="text-sm">
              Home
            </Link>
          </li>
          <li className={location.pathname === "/create" ? "active" : ""}>
            <Link to={"/create"} className="text-sm">
              Create
            </Link>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to={"/about"} className="text-sm">
              About
            </Link>
          </li>
          {user?.displayName ? (
            <div className="flex gap-4 md:flex-row items-center flex-col">
              <li onClick={LogOut} className="text-sm cursor-pointer">
                LogOut
              </li>
              <div className=" flex md:flex-row md:gap-2 justify-center flex-col items-center ">
                <PiUserCircleGearFill className="text-4xl" />
                <span className="text-sm">{user?.displayName}</span>
              </div>
            </div>
          ) : (
            <li
              className={
                location.pathname === "/auth"
                  ? "active font-bold ml-4"
                  : " font-bold ml-4"
              }
            >
              <Link to={"/auth"}>Login</Link>{" "}
            </li>
          )}
        </ul>

        <FaHamburger
          onClick={() => setOpen(!open)}
          className="text-white text-3xl  cursor-pointer md:hidden"
        />
      </div>
    </nav>
  );
}

export default Header;
