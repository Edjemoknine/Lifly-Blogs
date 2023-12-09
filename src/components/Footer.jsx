import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-6">
      <div className="flex gap-6 justify-center mb-3">
        <Link className="hover:text-gray-600 duration-300" to={"/"}>
          Home
        </Link>
        <Link className="hover:text-gray-600 duration-300" to={"/about"}>
          About
        </Link>
        <Link className="hover:text-gray-600 duration-300" to={"/contact"}>
          Contact
        </Link>
      </div>
      <p className="text-sm text-slate-300">
        Powered by Moknine - News and Magazine , All Right Reserved{" "}
      </p>
    </footer>
  );
};

export default Footer;
