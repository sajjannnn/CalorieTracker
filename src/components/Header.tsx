import { auth } from "../utilis/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utilis/userSlice";
import { LOGO_URL } from "../utilis/constants";
import { type RootState } from "../utilis/appStore";
import { setActivePage } from "../utilis/activePage";
import { IoMdHome } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { IoAddSharp } from "react-icons/io5";
import { LuChefHat } from "react-icons/lu";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((store: RootState) => store.activePage.page);
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
  const recipeButton = () => {
    navigate("/recipe");
    dispatch(setActivePage("/recipe"));
  };
  const contactButton = () => {
    navigate("/contact");
    dispatch(setActivePage("/contact"));
  };
  const homeButton = () => {
    navigate("/");
    dispatch(setActivePage("/"));
  };
  const calorieCheckButton = () => {
    navigate("/calorie-check");
    dispatch(setActivePage("/calorie-check"));
  };
  const addMealButton = () => {
    navigate("/add-meal");
    dispatch(setActivePage("/add-meal"));
  };

  return (
    <div className="flex justify-center w-screen md:fixed h-[100px] border-b-2 bg-white">
      <div className="w-7xl">
        <div className=" flex justify-between items-center w-full text-black md:px-6 ">
          <img className="h-20 " src={LOGO_URL} alt="" onClick={homeButton} />
          {/* <h1 className="font-serif text-6xl font-extrabold bg-white my-2 py-4 ">Food Tracker </h1> */}
          {user && (
            <div className="hidden md:block md:flex justify-between items-center gap-4 font-bold text-xl ">
              <button className={"p-2 flex items-center" + (page === "/" ? " bg-black rounded text-white" : "")} onClick={homeButton}>
                <IoMdHome />
                Home{" "}
              </button>
              <button className={"p-2 flex items-center" + (page === "/calorie-check" ? " bg-black rounded text-white" : "")} onClick={calorieCheckButton}>
              <IoAddSharp />  Calorie Check{" "}
              </button>
              <button className={"p-2 flex items-center" + (page === "/recipe" ? " bg-black rounded text-white" : "")} onClick={recipeButton}>
                <LuChefHat />
                Recipe{" "}
              </button>{" "}
              <button className={"p-2 flex items-center" + (page === "/add-meal" ? " bg-black rounded text-white" : "")} onClick={addMealButton}>
              <GiMeal />  Add Meal{" "}
              </button>
              <button className={"p-2 flex items-center" + (page === "/contact" ? " bg-black rounded text-white" : "")} onClick={contactButton}>
              <IoIosCall />  Contact us{" "}
              </button>{" "}
            </div>
          )}
          {user && (
            <div className="flex  font-bold ">
              <button className="hidden md:block my-10  px-3 rounded font-bold text-sm md:text-xl hover:bg-black hover:text-white" onClick={handleSignOut}>
                ➜] Sign out{" "}
              </button>
              <button className="md:hidden text-3xl mr-2" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
              </button>
            </div>
          )}
          {user && menuOpen && (
            <div className="absolute z-30 w-screen mt-[100px] bg-white ">
              <ul className="">
                <li
                  className="p-4 font-bold border-b "
                  onClick={() => {
                    homeButton();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  {" "}
                  Home{" "}
                </li>
                <li
                  className="p-4 font-bold border-b"
                  onClick={() => {
                    recipeButton();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  {" "}
                  Recipe{" "}
                </li>
                <li
                  className="p-4 font-bold border-b"
                  onClick={() => {
                    calorieCheckButton();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  {" "}
                  Calorie Check{" "}
                </li>
                <li
                  className="p-4 font-bold border-b"
                  onClick={() => {
                    addMealButton();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  {" "}
                  Add Meal{" "}
                </li>
                <li
                  className="p-4 font-bold border-b"
                  onClick={() => {
                    contactButton();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  {" "}
                  Contact us{" "}
                </li>
                <li
                  className="p-4 font-bold border-b"
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  {" "}
                  Sign out{" "}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
