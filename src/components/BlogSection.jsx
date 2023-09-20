import React from "react";
import { BsTrash3 } from "react-icons/bs";
import { FcEditImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function BlogSection({ blogs, user, deleteBlog, editBlog }) {
  // sweet alaert
  const userUid = user?.uid;

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
    <div className="container mx-auto">
      <h1 className="text-start text-lg p-2 mb-4 border-b-2 border-black">
        Daily Blogs
      </h1>
      <div className="">
        {blogs.map((item) => {
          return (
            <div key={item.id} className="shadow-lg flex mb-4  min-h-52">
              <div className=" overflow-hidden w-80  bg-blue-500">
                <img
                  className="w-full h-full hover:scale-105 transition duration-500 object-fill"
                  src={item.imgUrl}
                  alt={item.title}
                />
              </div>
              <div className="info p-4 w-full flex flex-col justify-between">
                <h6 className="bg-blue-500 p-1 rounded w-fit text-xs text-white">
                  {item.category}
                </h6>
                <span className=" text-xl">{item.title}</span>
                <span>
                  <p className="font-semibold text-gray-400">{item.author}</p>
                  {/* {item.timestamp} */}
                </span>
                <div>{item.description}</div>
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
    </div>
  );
}

export default BlogSection;
