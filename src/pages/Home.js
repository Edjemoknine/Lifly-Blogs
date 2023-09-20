import {
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import BlogSection from "../components/BlogSection";
import { PacmanLoader } from "react-spinners";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import Trending from "../components/Trending";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trend, setTranding] = useState([]);

  // get all blogs
  useEffect(() => {
    GetTrandingBlogs();
    const q = query(collection(db, "blogs"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let arrBlogs = [];
      let arrTags = [];
      QuerySnapshot.forEach((doc) => {
        arrTags.push(...doc.get("tags"));
        arrBlogs = [...arrBlogs, { ...doc.data(), id: doc.id }];
      });
      setBlogs(arrBlogs);
      setTags([...new Set(arrTags)]);
    });
    return () => unsubscribe();
  }, []);

  // delete Blog
  const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
  };
  // Gert Tranding Blogs
  const GetTrandingBlogs = async () => {
    const TrndRef = collection(db, "blogs");
    const TrendQuery = query(TrndRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(TrendQuery);
    let TrendingArr = [];
    querySnapshot.docs.map((blog) => {
      return TrendingArr.push({ id: blog.id, ...blog.data() });
    });
    setTranding(TrendingArr);
  };

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
    <div className="container mx-auto">
      <div className="trending">
        <Trending blogs={trend} />
      </div>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        <div className="col-span-2">
          <BlogSection user={user} blogs={blogs} deleteBlog={deleteBlog} />
        </div>
        <div className="col-span-1">
          <div>
            <Tags blogs={blogs} tags={tags} />
          </div>
          <div>
            <MostPopular blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
