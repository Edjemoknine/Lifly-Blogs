import "./App.scss";
// import "../node_modules/react-slick/dist/react-slick";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Search from "./pages/Search";
import Details from "./pages/Details";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUpdate from "./pages/AddUpdate";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import { useContext } from "react";

import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import { BlogsContext } from "./context/BlogContext";

function App() {
  const { user } = useContext(BlogsContext);

  return (
    <Router>
      <Header user={user} />
      <ToastContainer />
      <div className="">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/search/:term" element={<Search />} />
          <Route path="/categories/:category" element={<Categories />} />
          <Route path="/details/:id" element={<Details />} />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/" />}
          />
          <Route path="/update/:id" element={<AddUpdate user={user} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
