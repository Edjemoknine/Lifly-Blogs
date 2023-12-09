import React from "react";
import { Link } from "react-router-dom";

const Tags = ({ blogs, tags }) => {
  //   let MostTags = [];
  //   blogs.forEach((blog) => {
  //     const { tags } = blog;
  //     MostTags.push(...tags);
  //   });
  //   console.log(MostTags);
  //   console.log(tags);
  return (
    <div>
      <div>
        <div className="mb-4 py-2 text-start">
          <h3 className="text-2xl font-semibold my-3 mb-6">Tags</h3>
          <div className="flex flex-wrap">
            {tags.map((tag, index) => {
              return (
                <Link
                  to={`/search/${tag}`}
                  key={index}
                  className="bg-slate-400 cursor-pointer hover:bg-slate-500 p-2 w-fit text-white text-sm m-1"
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
