import ReactTagInput from "@pathofdev/react-tag-input";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  // updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
const AddUpdate = ({ user }) => {
  const [state, setState] = useState(inialState);
  const { title, tags, trending, category, description } = state;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  // console.log(state);
  const { id } = useParams();

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

  return (
    <div className="container mx-auto flex justify-center items-center">
      <div className=" w-full mt-8 pt-6 max-w-[500px] min-h-[450px] text-center flex justify-center flex-col items-center border ">
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
                placeholder="Tags"
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
  );
};

export default AddUpdate;
