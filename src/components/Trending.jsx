import React from "react";
import Slider from "react-slick";
import { settings } from "../utility/CarosselSetting";
import { Link } from "react-router-dom";

const Trending = ({ blogs }) => {
  return (
    <div className="container mx-auto">
      <h3 className="mt-4 text-lg py-2 border-b border-black">Trending</h3>
      <Slider {...settings} className=" mt-5 mb-10 ">
        {blogs.map((blog) => {
          return (
            <Link to={`/details/${blog.id}`} key={blog.id}>
              <div className="h-80 relative overflow-hidden mx-2">
                <img
                  className="h-full w-full object-cover"
                  src={blog.imgUrl}
                  alt={blog.title}
                />
                <div className="overlay absolute w-full h-full top-0 left-0"></div>
                <div className="info absolute bottom-2 left-4 text-white">
                  <h3 className="font-semibold text-xl">{blog.title}</h3>
                  <span className="text-sm text-gray-300">{blog.author}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default Trending;
