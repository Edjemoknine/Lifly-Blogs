import React from "react";

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
          <h1 className="text-lg mb-2 pb-2 border-b-2 border-black">Tags</h1>
          <div className="flex flex-wrap">
            {tags.map((tag, index) => {
              return (
                <div
                  key={index}
                  className="bg-slate-400 cursor-pointer hover:bg-slate-500 p-2 w-fit text-white text-sm m-1"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
