import { auth } from "../utilis/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utilis/userSlice";
import { LOGO_URL } from "../utilis/constants";
import { type RootState } from "../utilis/appStore";
import { setActivePage } from "../utilis/activePage";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((store: RootState) => store.activePage.page);
  const [menuOpen, setMenuOpen] = useState(false);
  // const address = () =>{
  //   console.log("clicked");
  // }

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
  const aboutButton = () => {
    navigate("/about");
    dispatch(setActivePage("/about"));
  };

  return (
    <div className="flex justify-center w-screen fixed border-b-2 bg-white shadow-xl">
      <div className="w-7xl">
        <div className="md:pt-4 flex justify-between w-full text-black md:px-6 ">
          <img className="h-28 md:m-4" src={LOGO_URL} alt="" onClick={homeButton} />
          {/* <h1 className="font-serif text-6xl font-extrabold bg-white my-2 py-4 ">Food Tracker </h1> */}
          {user && (
            <div className="hidden md:block md:flex justify-between items-center gap-4 font-bold text-xl ">
              <button className={"p-2" + (page === "/" ? " bg-black rounded text-white" : "")} onClick={homeButton}>
                Home{" "}
              </button>
              {/* <button className="p-2 px-4 " onClick={recipeButton}>
                Calorie Check{" "}
              </button> */}
              <button className={"p-2" + (page === "/recipe" ? " bg-black rounded text-white" : "")} onClick={recipeButton}>
                Recipe{" "}
              </button>
              <button className={"p-2 " + (page === "/about" ? " bg-black rounded text-white" : "")} onClick={aboutButton}>
                About{" "}
              </button>
              <button className={"p-2 " + (page === "/contact" ? " bg-black rounded text-white" : "")} onClick={contactButton}>
                Contact us{" "}
              </button>{" "}
              
            </div>
          )}
          {user && (
            <div className="flex  font-bold ">
              <button className="hidden md:block my-8 px-3 rounded font-bold text-sm md:text-xl hover:bg-black hover:text-white" onClick={handleSignOut}>
                ➜] Sign out{" "}
              </button>
              <button className="md:hidden text-3xl mr-2" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
              </button>
            </div>
          )}
          {user && menuOpen && (
            <div className="absolute z-30 w-screen mt-29 bg-white">
              <ul className="">
                <li
                  className="p-4 font-bold border-b"
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
                    aboutButton();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  {" "}
                  About{" "}
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
