import React from "react";
import { Link } from "react-router-dom";

const Category = ({ cat }) => {
  return (
    <Link to={`/categories/${cat}`}>
      <div className=" flex items-center text-xs justify-between gap-2 border mb-3 border-gray-500 rounded-full w-fit px-2">
        <span
          className={`${
            cat === "Entertainment"
              ? "bg-sky-400"
              : cat === "Technology"
              ? "bg-purple-500"
              : cat === "Politics"
              ? "bg-orange-500"
              : cat === "Sports"
              ? "bg-green-500"
              : "bg-red-500"
          }  w-2 h-2  rounded-full`}
        ></span>{" "}
        {cat}
      </div>
    </Link>
  );
};

export default Category;
