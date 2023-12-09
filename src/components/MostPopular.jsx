import React from "react";
import { useNavigate } from "react-router-dom";

const MostPopular = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="text-2xl font-semibold my-3 mb-6">Most Populair</h3>
      {blogs.map((item) => {
        return (
          <div
            key={item.id}
            className="flex mb-4 gap-4 items-start cursor-pointer"
            onClick={() => navigate(`/details/${item.id}`)}
          >
            <div className="w-28 h-20  overflow-hidden rounded">
              <img
                className="w-28 h-full  object-cover"
                src={item.imgUrl}
                alt={item.title}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm">{item.title.substring(0, 25)}</h3>
              <p className="bg-sky-500 px-1 w-fit text-xs text-white mt-1 rounded">
                {item.trending === "yes" ? "trending" : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MostPopular;
