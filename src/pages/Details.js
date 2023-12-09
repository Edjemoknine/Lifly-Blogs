import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { PacmanLoader } from "react-spinners";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import {
  FaBookmark,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import Category from "../components/Category";
import { BlogsContext } from "../context/BlogContext";

const Details = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  const { saved, saveBlog, removeBlog } = useContext(BlogsContext);

  const PostYMight = blogs?.filter((post) => post.category === blog.category);
  // console.log(PostYMight);

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);

      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));

      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };
    getAllBlogs();
  }, []);

  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);

    setBlog({ ...blogDetail.data(), id: docRef.id });
  };
  const [bookMark, setBookMark] = useState(false);
  useEffect(() => {
    const test = saved.some((post) => post.id === blog.id);
    setBookMark(test);
  });

  const ToggleSave = (blog) => {
    if (bookMark === false) {
      return saveBlog(blog);
    } else {
      return removeBlog(blog.id);
    }
  };

  // console.log(blog?.timestamp?.toDate().toString());
  const date = blog?.timestamp?.toDate().toString();
  return (
    <>
      {Object.keys(blog).length <= 0 ? (
        <div className="h-screen w-full relative">
          <PacmanLoader
            color="#3498db"
            className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      ) : (
        <div className="container mx-auto pb-6">
          <div className="relative mt-6 overflow-hidden rounded-xl mx-auto h-[400px]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("${blog?.imgUrl}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className={`text-white  absolute cursor-pointer left-3 bottom-3 z-50`}
              >
                <Category cat={blog.category} />
              </div>
              <FaBookmark
                onClick={() => ToggleSave(blog)}
                size={30}
                className={`${
                  bookMark ? "text-blue-500" : "text-white"
                } absolute cursor-pointer focus:scale-105 right-3 bottom-3  z-50`}
              />

              <div className=" absolute top-0 left-0 w-full bg-black/50 h-full"></div>
              <div className="blog_title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-4xl md:text-6xl capitalize leading-tight  text-center text-gray-200 font-semibold">
                  {blog?.title}
                </h2>
              </div>
            </div>
          </div>

          <div className=" mt-6 grid gap-6 md:grid-cols-3">
            <div className="info_details col-span-2">
              <div className="flex  items-baseline gap-3 ">
                <p className=" border-black text-lg py-2 ">
                  Created By <span className="font-bold">{blog?.author}</span>{" "}
                </p>
                <span className="text-xs text-gray-500">
                  {date.substring(0, 15)}
                </span>
              </div>

              <div className="min-h-[300px]">
                <span>${blog?.description}</span>
              </div>
              <div className=" my-6">
                <div className="py-2 my-3">
                  <h3 className=" text-2xl font-semibold ">Related posts</h3>
                  <p className="text-zinc-500 text-sm">You Might Want To See</p>
                </div>
                <div className="grid md:grid-cols-3 w-full  gap-3">
                  {PostYMight?.slice(0, 4).map((post) => (
                    <Link
                      to={`/details/${post.id}`}
                      className="rounded-lg shadow-lg h-80  overflow-hidden group"
                      key={post.id}
                    >
                      <div className="h-44 relative overflow-hidden mx-2">
                        <img
                          className="h-full w-full object-cover rounded-lg"
                          src={post?.imgUrl}
                          alt={post?.title}
                        />
                        <div className="overlay group-hover:flex hidden duration-300 absolute w-full h-full top-0 left-0"></div>
                      </div>
                      <div className="mt-2 px-3">
                        <Category cat={post?.category} />
                        <h3 className="font-semibold text-sm">{post.title}</h3>
                        <span className="text-sm text-gray-300">
                          {post?.author}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-1 flex flex-wrap gap-6 md:gap-3 items-baseline md:flex-col">
              <div>
                <MostPopular blogs={blogs.slice(0, 4)} />
              </div>
              <div>
                <Tags blogs={blogs} tags={tags} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold my-3 mb-6">
                  Subscribe and Follow
                </h3>
                <div className="flex flex-col gap-3 items-center">
                  <div className="flex items-center w-full justify-between text-white px-4 rounded-lg py-2 bg-blue-800">
                    <p>
                      Facebook
                      <span>5.3K</span>
                    </p>
                    <FaFacebook />
                  </div>
                  <div className="flex items-center w-full justify-between text-white px-4 rounded-lg py-2 bg-sky-500">
                    <p>
                      Twitter
                      <span>63K</span>
                    </p>
                    <FaTwitter />
                  </div>
                  <div className="flex items-center w-full justify-between text-white px-4 rounded-lg py-2 bg-blue-900">
                    <p>
                      Instagram
                      <span>1M</span>
                    </p>
                    <FaInstagram />
                  </div>
                  <div className="flex items-center w-full justify-between text-white px-4 rounded-lg py-2 bg-red-500">
                    <p>
                      YouTube
                      <span>2M</span>
                    </p>
                    <FaYoutube />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
