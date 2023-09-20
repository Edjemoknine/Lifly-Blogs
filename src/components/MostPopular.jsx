import React from "react";
import { useNavigate } from "react-router-dom";

const MostPopular = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-start text-lg border-b-2 border-black my-2 mb-6 py-2">
        Most Popular
      </h2>
      {blogs.map((item) => {
        return (
          <div
            key={item.id}
            className="flex mb-4 gap-4 items-start cursor-pointer"
            onClick={() => navigate(`/details/${item.id}`)}
          >
            <div className="img w-28 overflow-hidden rounded">
              <img src={item.imgUrl} alt={item.title} />
            </div>
            <div className="info">
              <h3>{item.title}</h3>
              <p>{item.trending}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MostPopular;
