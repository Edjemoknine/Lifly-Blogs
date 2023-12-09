import React, { useContext } from "react";

import BlogSection from "../components/BlogSection";
import { PacmanLoader } from "react-spinners";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import Trending from "../components/Trending";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nautre from "../images/nature.jpg";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BlogsContext } from "../context/BlogContext";
const Home = ({ user }) => {
  const { blogs, tags, trend, deleteBlog } = useContext(BlogsContext);

  if (blogs.length <= 0) {
    return (
      <div className="h-screen w-full relative">
        <PacmanLoader
          color="#3498db"
          className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto pb-6">
        <div className="relative  mt-6 overflow-hidden rounded-xl mx-auto h-[400px]">
          <div className="absolute top-0 z-10 left-0 w-full h-full bg-black/40"></div>
          <img
            className="w-full h-full z-10 object-cover"
            src={nautre}
            alt=""
          />
          <div className="absolute w-full z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <h1 className="text-7xl leading-none text-center text-white font-bold font-caveat">
              Share Stories <br className="hidden md:flex" /> and{" "}
              <br className="hidden md:flex" /> Discover the last News
            </h1>
          </div>
        </div>
        <div className="trending">
          <Trending blogs={trend} />
        </div>
        <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
          <div className="col-span-2">
            <BlogSection user={user} blogs={blogs} deleteBlog={deleteBlog} />
          </div>
          <div className="col-span-1">
            <div>
              <MostPopular blogs={blogs} />
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
    </>
  );
};

export default Home;
