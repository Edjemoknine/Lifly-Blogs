import React, { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { FcEditImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Category from "./Category";
function BlogSection({ blogs, user, deleteBlog, editBlog }) {
  // sweet alaert
  const userUid = user?.uid;
  const [max, setMax] = useState(6);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="">
      <div className="py-2 my-6">
        <h3 className=" text-3xl font-semibold ">Selected Posts</h3>
        <p className="text-zinc-500 text-sm">EDITOR'S PICKS</p>
      </div>
      <div className="">
        {blogs?.slice(0, max).map((item) => {
          return (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden flex-col md:flex-row shadow-lg flex mb-4  min-h-52"
            >
              <div className=" overflow-hidden md:w-80 md:hf h-60 w-full  bg-blue-500">
                <img
                  className="w-full h-full hover:scale-105 transition duration-500 object-cover"
                  src={item.imgUrl}
                  alt={item.title}
                />
              </div>
              <div className="info flex-1 p-4 w-full flex flex-col justify-between">
                <Category cat={item.category} />
                <span className=" text-xl">{item.title}</span>
                <span>
                  <p className="font-semibold text-gray-400">{item.author}</p>
                  {/* {item.timestamp} */}
                </span>
                <div>{item.description.substring(0, 100)} ...</div>
                <div className="flex justify-between mt-2 items-end">
                  <Link
                    to={`/details/${item.id}`}
                    className="bg-slate-600 p-2 text-white text-sm"
                  >
                    Read More
                  </Link>
                  {userUid && userUid === item.Id && (
                    <div className=" flex items-center gap-3">
                      <span>
                        <BsTrash3
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 text-xl cursor-pointer"
                        />
                      </span>
                      <Link to={`/update/${item.id}`}>
                        <FcEditImage className="text-blue-500 text-xl cursor-pointer" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {blogs?.length > 6 && (
        <div className=" grid place-items-center">
          <button
            onClick={() => setMax((prev) => prev + 6)}
            className="bg-slate-600 mt-3  mb-10 p-2 text-white text-sm"
          >
            Read more
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogSection;
