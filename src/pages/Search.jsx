import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BlogsContext } from "../context/BlogContext";
import Category from "../components/Category";

function Search() {
  const { blogs } = useContext(BlogsContext);
  const { term } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const filterBlogs = blogs.filter(
      (blog) =>
        blog.category.toLowerCase().includes(term.toLowerCase()) ||
        blog.title.toLowerCase().includes(term.toLowerCase()) ||
        blog.description.toLowerCase().includes(term.toLowerCase()) ||
        blog.author.toLowerCase().includes(term.toLowerCase())
    );
    // console.log(filterBlogs);
    setData(filterBlogs);
  }, [term]);

  return (
    <div className="container mx-auto pb-6 min-h-[67vh]">
      {" "}
      <div className="py-2 b mt-4 border-black">
        <h3 className=" text-3xl font-semibold ">What's trending today</h3>
        <p className="text-zinc-500 text-sm">PEOPLE LOVE IT</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3 ">
        {data?.map((blog) => {
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
}

export default Search;
