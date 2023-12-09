import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BlogsContext } from "../context/BlogContext";
import Category from "../components/Category";

const Categories = () => {
  const { blogs } = useContext(BlogsContext);
  const { category } = useParams();
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    const Filtredcategories = blogs.filter(
      (blog) => blog.category === category
    );
    setCatData(Filtredcategories);
  }, [category]);

  return (
    <div className="container mx-auto pb-6">
      {" "}
      <div className="relative mt-6 overflow-hidden rounded-xl mx-auto h-[400px]">
        <div className="absolute top-0 z-10 left-0 w-full h-full bg-black/40"></div>
        <img
          className="w-full h-full z-10 object-cover"
          src={catData[0]?.imgUrl}
          alt={category}
        />
        <div className="absolute w-full z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <h1 className="text-7xl leading-none text-center text-white font-bold font-caveat">
            Discover the last <br className="hidden md:flex" />
            {category}
            <br className="hidden md:flex" /> News
          </h1>
        </div>
      </div>
      <div className="py-2 b mt-4 border-black">
        <h3 className=" text-3xl font-semibold ">Trending {category} blogs</h3>
        <p className="text-zinc-500 text-sm">PEOPLE LOVE IT</p>
      </div>
      <div className="grid sm:grid-cols-2 mt-6 md:grid-cols-4 gap-3">
        {catData.map((blog) => {
          return (
            <div
              key={blog.id}
              className="rounded-lg  mb-6 relative shadow-lg h-80  overflow-hidden group"
            >
              <Link to={`/details/${blog.id}`}>
                <div className="h-44 relative overflow-hidden mx-2">
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src={blog.imgUrl}
                    alt={blog.title}
                  />
                  <div className="overlay rounded-lg  group-hover:flex hidden duration-300 absolute w-full h-full top-0 left-0"></div>
                </div>
              </Link>
              <div className="mt-2 px-3">
                <Category cat={blog.category} />
                <h3 className="font-semibold">{blog.title}</h3>

                <span className="text-sm text-gray-300">{blog.author}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
