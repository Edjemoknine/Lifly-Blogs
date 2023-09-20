import React from "react";
import notfound from "../images/NotFound.jpg";

const Error = () => {
  return (
    <div className="max-h-full w-full">
      <img className="max-h-screen w-full" src={notfound} alt="Not Found" />
    </div>
  );
};

export default Error;
