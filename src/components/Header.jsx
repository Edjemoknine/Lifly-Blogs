import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { PiUserCircleGearFill } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
function Header({ user }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setOpen(false);
    });
    setOpen(false);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerm("");
    navigate(`/search/${term}`);
  };

  return (
    <nav className=" text-black  shadow-md py-2 relative z-50 ">
      <div className="container   md:px-6 mx-auto  flex justify-between h-12 text-black text-xl items-center gap-6">
        <Link to={"/"} className="font-bold  text-black text-3xl font-caveat">
          Latest
        </Link>
        <form className=" relative" onSubmit={handleSubmit}>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full bg-slate-100 outline-none pr-4 pl-12 py-1 text-base rounded-full"
            type="text"
            placeholder="Search"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
        </form>

        <ul
          className={`${
            open
              ? "flex shadow-lg text-black  duration-300 absolute top-[110%]  right-4 bg-blue-400 w-60 h-60 gap-6 rounded-lg p-16 flex-col justify-start items-center"
              : " absolute -right-full duration-300 top-[110%]  bg-blue-400 w-60 h-60 rounded-lg"
          } md:flex md:flex-row md:items-center  md:relative md:top-0 md:h-0 md:right-0 md:bg-inherit md:w-auto md:p-6`}
        >
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to={"/"} className="text-sm">
              Home
            </Link>
          </li>

          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to={"/about"} className="text-sm">
              About
            </Link>
          </li>
          {user?.displayName ? (
            <Link
              to={"/profile"}
              className=" flex md:flex-row md:gap-2 justify-center flex-col items-center "
            >
              <PiUserCircleGearFill className="text-4xl" />
            </Link>
          ) : (
            // </div>
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

        <MdMenu
          onClick={() => setOpen(!open)}
          className="text-black text-3xl  cursor-pointer md:hidden"
        />
      </div>
    </nav>
  );
}

export default Header;
