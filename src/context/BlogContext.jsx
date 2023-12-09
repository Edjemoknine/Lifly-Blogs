import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const BlogsContext = createContext();
const savedBlogs = JSON.parse(localStorage.getItem("blog") || "[]");
const BlogProvider = ({ children }) => {
  const [saved, setSaved] = useState(savedBlogs);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trend, setTranding] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const onsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => onsubscribe();
  }, []);

  //////////////////////////// ////////////////////////////////

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

  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(saved));
  }, [saved]);

  const saveBlog = (blog) => {
    setSaved([...saved, { ...blog, user: user.uid }]);
  };

  const removeBlog = (id) => {
    setSaved(saved.filter((blog) => blog.id !== id));
  };

  return (
    <BlogsContext.Provider
      value={{
        user,
        blogs,
        deleteBlog,
        tags,
        trend,
        saved,
        saveBlog,
        removeBlog,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
};

export default BlogProvider;
