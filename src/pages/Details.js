import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { PacmanLoader } from "react-spinners";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";

const Details = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

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

    setBlog(blogDetail.data());
  };
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
        <>
          <div className="h-[550px] w-full relative">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("${blog?.imgUrl}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div className="overlay absolute top-0 left-0 w-full h-full"></div>
              <div className="blog_title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-8xl text-gray-200 font-semibold">
                  {blog?.title}
                </h2>
              </div>
            </div>
          </div>

          <div className="container mx-auto mt-6 grid gap-6 md:grid-cols-3">
            <div className="info_details col-span-2">
              <p className="border-b-2 border-black text-lg mb-4 py-2 uppercase font-semibold">
                {blog?.author} -{" "}
              </p>
              <span>${blog?.description}</span>
            </div>
            <div className="col-span-1">
              <Tags tags={tags} />
              <MostPopular blogs={blogs} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;
