import React from "react";
import Slider from "react-slick";
import { settings } from "../utility/CarosselSetting";
import { Link } from "react-router-dom";
import Category from "./Category";

const Trending = ({ blogs }) => {
  const category = new Set(blogs.map((b) => b.category));

  return (
    <div className="">
      <div className="py-2 b mt-4 border-black">
        <h3 className=" text-3xl font-semibold ">What's trending today</h3>
        <p className="text-zinc-500 text-sm">PEOPLE LOVE IT</p>
      </div>
      <Slider {...settings} className=" mt-5 mb-10 flex items-stretch ">
        {blogs.map((blog) => {
          return (
            <div className="rounded-lg shadow-lg h-80  overflow-hidden group">
              <Link to={`/details/${blog.id}`} key={blog.id}>
                <div className="h-44 relative overflow-hidden mx-2">
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src={blog.imgUrl}
                    alt={blog.title}
                  />
                  <div className="rounded-lg overlay group-hover:flex hidden duration-300 absolute w-full h-full top-0 left-0"></div>
                </div>
              </Link>
              <div className="mt-2 px-3">
                <Category cat={blog.category} />
                <Link to={`/details/${blog.id}`}>
                  <h3 className="font-semibold">{blog.title}</h3>
                </Link>
                <span className="text-sm text-gray-300">{blog.author}</span>
              </div>
            </div>
          );
        })}
      </Slider>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Link
            to={`/details/${blogs[0].id}`}
            className="rounded-lg shadow-lg h-[400px]  overflow-hidden group"
            key={blogs[0].id}
          >
            <div className="h-96 relative overflow-hidden mx-2">
              <img
                className="h-full w-full object-cover rounded-lg"
                src={blogs[0].imgUrl}
                alt={blogs[0].title}
              />
              <div className="overlay rounded-lg  duration-300 absolute w-full h-full top-0 left-0"></div>
              <div className="mt-2 text-gray-300 px-3 absolute bottom-3">
                <Category cat={blogs[0].category} />
                <h3 className="font-semibold text-xl">{blogs[0].title}</h3>
                <span className="text-sm text-gray-300">{blogs[0].author}</span>
              </div>
            </div>
          </Link>
        </div>
        <div className=" md:w-80">
          <h3 className="text-3xl mb-3 font-semibold">Categories</h3>
          {[...category].map((cat, i) => {
            return (
              <Link to={`/categories/${cat}`}>
                <div
                  style={{ backgroundImage: `url(${blogs[i].imgUrl})` }}
                  className="bg-green-400 px-4 py-2 rounded-lg mb-2 text-black"
                  key={cat}
                >
                  {cat}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trending;
