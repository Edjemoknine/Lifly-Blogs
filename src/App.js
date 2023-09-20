import "./App.scss";
import "tiny-slider/dist/tiny-slider.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Details from "./pages/Details";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUpdate from "./pages/AddUpdate";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Error from "./pages/Error";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const onsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => onsubscribe();
  }, []);

  return (
    <Router>
      <Header user={user} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/details/:id" element={<Details />} />
        <Route
          path="/create"
          element={user ? <AddUpdate user={user} /> : <Navigate to="/" />}
        />
        <Route path="/update/:id" element={<AddUpdate user={user} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
