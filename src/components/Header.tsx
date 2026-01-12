import { auth } from "../utilis/firebase";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utilis/userSlice";
import { LOGO_URL } from "../utilis/constants";
import { type RootState } from "../utilis/appStore";
import { IoMdHome } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { IoAddSharp } from "react-icons/io5";
import { LuChefHat } from "react-icons/lu";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email || null, displayName: displayName || null, photoURL: photoURL || null }));
        navigate("/");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/login");
      }
    });

    return unsubscribe;
  }, []);
  const user = useSelector((store: RootState) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(() => {
        // An error happened.
        navigate("/error");
      });
  };
  const activeAnimation = (isActive: boolean) => {
    return isActive ? " bg-green-500 rounded text-white" : "hover:bg-[#f8f7f3]";
  };

  return (
    <div className="flex justify-center w-screen md:fixed h-[100px] border-b-2 border-gray-400 bg-white">
      <div className="w-7xl">
        <div className=" flex justify-between items-center w-full text-gray-700  md:px-6 ">
          <img className="h-20" src={LOGO_URL} alt="" />
          {/* <h1 className="font-serif text-6xl font-extrabold bg-white my-2 py-4 ">Food Tracker </h1> */}
          {user && (
            <div className="hidden lg:block lg:flex justify-between items-center gap-4 text-xl ">
              <NavLink to="/" className={({ isActive }) => `p-2 flex items-center ${activeAnimation(isActive)}`}>
                Home
                <IoMdHome />
              </NavLink>{" "}
              <NavLink to="/calorie-check" className={({ isActive }) => `p-2 flex items-center ${activeAnimation(isActive)}`}>
                <IoAddSharp /> Calorie Check{" "}
              </NavLink>{" "}
              <NavLink to="/recipe" className={({ isActive }) => `p-2 flex items-center ${activeAnimation(isActive)}`}>
                <LuChefHat />
                Recipe
              </NavLink>{" "}
              <NavLink to="/add-meal" className={({ isActive }) => `p-2 flex items-center ${activeAnimation(isActive)}`}>
                <GiMeal /> Add Meal{" "}
              </NavLink>{" "}
              <NavLink to="/contact" className={({ isActive }) => `p-2 flex items-center ${activeAnimation(isActive)}`}>
                <IoIosCall /> Contact us{" "}
              </NavLink>
            </div>
          )}
          {user && (
            <div className="flex  ">
              <button className="hidden lg:block my-8 px-3 py-1 rounded text-sm md:text-xl hover:bg-green-500 hover:text-white" onClick={handleSignOut}>
                ➜] Sign out{" "}
              </button>
              <button
                className="lg:hidden text-3xl mr-2 my-8"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
              >
                ☰
              </button>
            </div>
          )}
        </div>
        {user && menuOpen && (
          <div className="lg:hidden absolute z-30 w-full bg-white ">
            <ul className="">
              <li>
                <Link to="/" className=" block p-4 font-bold border-b " onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calorie-check" className=" block p-4 font-bold border-b " onClick={() => setMenuOpen(false)}>
                  Calorie Check{" "}
                </Link>
              </li>
              <li>
                <Link to="/recipe" className=" block p-4 font-bold border-b " onClick={() => setMenuOpen(false)}>
                  {" "}
                  Recipe{" "}
                </Link>
              </li>

              <li>
                <Link to="/add-meal" className=" block p-4 font-bold border-b " onClick={() => setMenuOpen(false)}>
                  {" "}
                  Add Meal{" "}
                </Link>
              </li>

              <li>
                <Link to="/contact" className=" block p-4 font-bold border-b " onClick={() => setMenuOpen(false)}>
                  {" "}
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" block p-4 font-bold border-b "
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
