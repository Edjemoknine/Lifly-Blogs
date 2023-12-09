import ReactTagInput from "@pathofdev/react-tag-input";
import React, { useContext, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { BsBookmarkX } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  // updateDoc,
} from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Category from "../components/Category";
import { settings } from "../utility/CarosselSetting";
import Slider from "react-slick";
import { BlogsContext } from "../context/BlogContext";

const inialState = {
  title: "",
  tags: [],
  trending: "yes",
  category: "",
  description: "",
};
const categoryOption = [
  "Technology",
  "Politics",
  "Sports",
  "Entertainment",
  "Business",
];
const Profile = ({ user }) => {
  const { saved, removeBlog } = useContext(BlogsContext);
  // console.log(saved);
  const [state, setState] = useState(inialState);
  const { title, tags, trending, category, description } = state;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  // console.log(state);
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleTags = (tags) => {
    setState({ ...state, tags });
  };

  // Upload Image In Storage
  useEffect(() => {
    const UploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (onSnapshot) => {
          const progress =
            (onSnapshot.bytesTransferred / onSnapshot.totalBytes) * 100;
          setProgress(progress);

          switch (onSnapshot.state) {
            case "paused":
              console.log("Upload Is Paused");
              break;
            case "running":
              console.log("Upload Is Running");
              break;

            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.success("Image Has Been Uploaded Successfuly");
            setState((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };
    file && UploadFile();
  }, [file]);

  const handleTranding = (e) => {
    setState({ ...state, trending: e.target.value });
  };
  const handleCategory = (e) => {
    setState({ ...state, category: e.target.value });
  };

  // Craete New Blog Or Update Blog ¤¤¤¤¤¤¤¤¤¤¤¤
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category && title && trending && description && tags) {
      if (!id) {
        // Create new blog
        try {
          await addDoc(collection(db, "blogs"), {
            ...state,
            timestamp: serverTimestamp(),
            author: user.displayName,
            Id: user.uid,
          });

          toast.success("Blog created successfuly");
        } catch (error) {
          console.log(error);
        }
      } else {
        //Update existing blog
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...state,
            timestamp: serverTimestamp(),
            author: user.displayName,
            Id: user.uid,
          });

          toast.success("Blog Have Been Updated Successfuly");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };

  // Update Blog *******************************
  useEffect(() => {
    id && getDetailsForUpdate();
  }, [id]);

  //1--Bring All Data Inform to Update-----------
  const getDetailsForUpdate = async () => {
    const docRef = doc(db, "blogs", id);

    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setState({ ...snapshot.data() });
    }
  };
  const LogOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const q = query(collection(db, "blogs"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let arrBlogs = [];
      let arrTags = [];
      QuerySnapshot.forEach((doc) => {
        arrTags.push(...doc.get("tags"));
        arrBlogs = [...arrBlogs, { ...doc.data(), id: doc.id }];
      });
      setBlogs(arrBlogs);
    });
    return () => unsubscribe();
  }, []);

  const userBlogs = blogs.filter((blog) => blog.Id === user.uid);

  return (
    <div className="container py-6  mx-auto ">
      <div className="flex gap-6 w-full flex-col-reverse md:flex-row justify-center py-6  ">
        <div className="flex-1 ">
          <div className="   w-full rounded-lg  pt-6 max-w-[500px] min-h-[450px] text-center flex justify-center flex-col items-center border ">
            <div className="title">
              <h2 className="text-3xl font-semibold">
                {id ? "Update Blog" : "Create Blog"}
              </h2>
            </div>
            <div className="w-full p-6">
              <form className="  w-full" onSubmit={handleSubmit}>
                {/* <div className="flex justify-between"> */}
                <div className="input-field mb-5 flex flex-col text-left gap-3">
                  <input
                    className="border rounded p-2"
                    type="text"
                    placeholder="Title"
                    value={title}
                    name="title"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="input-field mb-5 border p-2 flex flex-col text-left gap-3">
                  <ReactTagInput
                    tags={tags}
                    placeholder="Add Tag and press enter"
                    onChange={handleTags}
                  />
                </div>
                {/* </div> */}

                <div className="input-field mb-5 flex gap-16">
                  <p>Is it trending blog ?</p>
                  <div className="flex items-center gap-2 justify-center">
                    <input
                      onChange={handleTranding}
                      checked={trending === "yes"}
                      name="trending"
                      id="trending"
                      className="border rounded p-2"
                      type="radio"
                      value={"yes"}
                      placeholder="Trending"
                    ></input>
                    <label htmlFor="trending">Yes</label>{" "}
                    <input
                      onChange={handleTranding}
                      checked={trending === "no"}
                      value={"no"}
                      name="trending"
                      id="trending"
                      className="border rounded p-2"
                      type="radio"
                      placeholder="Trending"
                    ></input>
                    <label htmlFor="trending">No</label>
                  </div>
                </div>

                <div className="input-field border p-3 mb-4 flex flex-col text-left gap-3">
                  <select onChange={handleCategory} value={category}>
                    <option value={"choose"}>Please Select Category</option>
                    {categoryOption.map((cate, index) => {
                      return (
                        <option key={index} value={cate}>
                          {cate}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="input-field mb-4 flex flex-col text-left gap-3">
                  <textarea
                    className="w-full h-20 p-3 border resize-x"
                    onChange={handleChange}
                    value={description}
                    placeholder="Description"
                    name="description"
                  ></textarea>
                </div>
                <div className="input-field  mb-3 flex flex-col text-left gap-3">
                  <input
                    type="file"
                    className="border rounded "
                    onChange={(e) => setFile(e.target.files[0])}
                  ></input>
                </div>

                <div>
                  <button
                    disabled={progress !== null && progress < 100}
                    className={
                      progress !== null && progress < 100
                        ? "bg-blue-500 mt-3 rounded transition duration-300 hover:bg-gray-400 text-white p-3 mb-3"
                        : "bg-blue-500 mt-3 rounded transition duration-300 hover:bg-blue-600 text-white p-3 mb-3 cursor-pointer"
                    }
                    type="submit"
                  >
                    {id ? "Update" : "Add Blog"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full border pt-6 rounded-lg pb-7 gap-2 flex flex-col items-center">
            <img
              src={
                user.photoURL ||
                "https://imgs.search.brave.com/TvFvWe5rA0iDtFoYv_niCj7S9kQCBJMgeClTbEknNHA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTE0NC8xMTQ0/NzYwLnBuZw"
              }
              className="w-40 h-40"
              alt="user profile"
            />
            <h3 className="text-xl mt-3 font-semibold">{user.displayName}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="px-10 pb-3">
              The functional aspect comes first in the work process because it’s
              the core of the object: What is its purpose? something else?
              Shape, texture and material come next.
            </p>
            <div className="flex  w-full justify-around gap-3 items-center">
              <div className="flex gap-3">
                <FaFacebook className="cursor-pointer text-2xl hover:scale-105 duration-300" />
                <FaTwitter className="cursor-pointer text-2xl hover:scale-105 duration-300" />
                <FaInstagram className="cursor-pointer text-2xl hover:scale-105 duration-300" />
                <FaYoutube className="cursor-pointer text-2xl hover:scale-105 duration-300" />
              </div>
              <button
                onClick={LogOut}
                className=" text-sm cursor-pointer bg-black text-white px-3 py-1 hover:bg-gray-900 rounded-lg"
              >
                LogOut
              </button>
            </div>
          </div>
          <p className="text-center py-5 text-xl font-semibold">
            Author Posts <br /> {userBlogs.length}
          </p>
        </div>
      </div>
      <div className="">
        <div className="py-2 b mt-4 border-black">
          <h3 className=" text-3xl font-semibold ">Your Recent Post</h3>
          <p className="text-zinc-500 text-sm">AUTHOR BLOGS</p>
        </div>
        <Slider {...settings} className=" mt-5 mb-10 flex items-stretch ">
          {userBlogs.map((blog) => {
            return (
              <div className="rounded-lg shadow-lg h-80  overflow-hidden group">
                <Link to={`/details/${blog.id}`} key={blog.id}>
                  <div className="h-44 relative overflow-hidden mx-2">
                    <img
                      className="h-full w-full object-cover rounded-lg"
                      src={blog.imgUrl}
                      alt={blog.title}
                    />
                    <div className="overlay rounded-lg group-hover:flex hidden duration-300 absolute w-full h-full top-0 left-0"></div>
                  </div>
                </Link>
                <div className="mt-2 px-3">
                  <Category cat={blog.category} />
                  <Link to={`/details/${blog.id}`}>
                    <h3 className="font-semibold">{blog.title}</h3>
                  </Link>
                  <span className="text-sm text-gray-400">{blog.author}</span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="">
        <div className="py-2 b mt-4 border-black">
          <h3 className=" text-3xl font-semibold ">Your Saved Posts</h3>
          <p className="text-zinc-500 text-sm"> BLOGS You Liked</p>
        </div>
        <div className=" mt-5 mb-10 flex  flex-wrap">
          {/* <Slider {...settings}> */}
          {saved
            .filter((item) => item.user === user.uid)
            .map((blog) => {
              return (
                <div
                  key={blog.id}
                  className="rounded-lg md:w-1/4 mb-6 sm:w-1/2 w-full relative shadow-lg h-80  overflow-hidden group"
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

                    <span className="text-sm text-gray-400">{blog.author}</span>
                    <BsBookmarkX
                      onClick={() => removeBlog(blog.id)}
                      className="absolute bottom-2 right-2 text-xl hover:text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          {/* </Slider> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
