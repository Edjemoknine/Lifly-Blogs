import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(true);
  const [state, setState] = useState(initialState);
  const { email, password, firstname, lastname, confirmPassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password don't match");
      }
      if (email && password && firstname) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstname} ${lastname}` });
        toast.success("You been Logged successfuly !");
      } else {
        return toast.error("All Field Is Required");
      }
    }
    navigate("/");
    setState(initialState);
  };
  return (
    <div className="container mx-auto flex justify-center items-center">
      <div className=" w-full mt-10 max-w-[500px] min-h-[450px] text-center flex justify-center flex-col items-center border">
        <div className="title">
          <h2 className="text-3xl font-semibold">
            {signUp ? "Sign Up" : "Sign In"}
          </h2>
        </div>
        <div className="w-full p-6">
          <form className="  w-full" onSubmit={handleSubmit}>
            {signUp && (
              <div className="flex justify-between">
                <div className="input-field mb-3 flex flex-col text-left gap-3">
                  <input
                    className="border rounded p-2"
                    type="text"
                    id="first"
                    placeholder="Enter Email"
                    value={firstname}
                    name="firstname"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="input-field mb-3 flex flex-col text-left gap-3">
                  <input
                    className="border rounded p-2"
                    type="text"
                    id="last"
                    name="lastname"
                    onChange={handleChange}
                    value={lastname}
                    placeholder="First Name"
                  ></input>
                </div>
              </div>
            )}
            <div className="input-field mb-3 flex flex-col text-left gap-3">
              <input
                onChange={handleChange}
                value={email}
                name="email"
                className="border rounded p-2"
                type="email"
                id="email"
                placeholder="Enter Email"
              ></input>
            </div>
            <div className="input-field mb-3 flex flex-col text-left gap-3">
              <input
                onChange={handleChange}
                name="password"
                value={password}
                className="border rounded p-2"
                type="password"
                id="password"
                placeholder=" Paswword"
              ></input>
            </div>
            {signUp && (
              <div className="input-field mb-3 flex flex-col text-left gap-3">
                <input
                  onChange={handleChange}
                  name="confirmPassword"
                  value={confirmPassword}
                  className="border rounded p-2"
                  type="password"
                  id="password"
                  placeholder="Confirm Paswword"
                ></input>
              </div>
            )}

            {signUp ? (
              <div>
                <button
                  className="bg-blue-500 mt-3 rounded transition duration-300 hover:bg-blue-600 text-white p-3 mb-3 cursor-pointer"
                  type="submit"
                >
                  Sign Up
                </button>
                <p>
                  You already have a compte?{" "}
                  <span
                    className="text-blue-500 cursor-pointer font-semibold"
                    onClick={() => setSignUp(!signUp)}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            ) : (
              <div>
                <button
                  className="bg-blue-500 mt-3 rounded transition duration-300 hover:bg-blue-600 text-white p-3 mb-3 cursor-pointer"
                  type="submit"
                >
                  Sign In
                </button>
                <p>
                  You don't have a compte?{" "}
                  <span
                    className="text-blue-500 cursor-pointer font-semibold"
                    onClick={() => setSignUp(!signUp)}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
