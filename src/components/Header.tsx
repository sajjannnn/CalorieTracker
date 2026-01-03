import { auth } from "../utilis/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utilis/userSlice";
import { LOGO_URL } from "../utilis/constants";
import { type RootState } from "../utilis/appStore";
import { setActivePage } from "../utilis/activePage";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const page = useSelector((store : RootState) => store.activePage.page)
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
    dispatch(setActivePage("/recipe"))
  };
  const contactButton = () => {
    navigate("/contact");
    dispatch(setActivePage("/contact"))

  };
  const homeButton = () => {
    navigate("/");
    dispatch(setActivePage("/"))
  }

  return (
    <div className="flex justify-center w-screen fixed border-b-2 bg-white shadow-xl">
      <div className="w-7xl">
        <div className="pt-4 flex justify-between w-full text-black px-6 ">
          <img className="h-28 m-4" src={LOGO_URL} alt="" onClick={homeButton} />
          {/* <h1 className="font-serif text-6xl font-extrabold bg-white my-2 py-4 ">Food Tracker </h1> */}
          {user && (
            <div className="flex justify-between items-center gap-4 font-bold text-xl ">
              <button className={"p-2" + (page === "/" ? " bg-black rounded text-white" : "")} onClick={homeButton}>
                Home{" "}
              </button>
              {/* <button className="p-2 px-4 " onClick={recipeButton}>
                Calorie Check{" "}
              </button> */}
              <button className={"p-2" + (page === "/recipe" ? " bg-black rounded text-white" : "")} onClick={recipeButton}>
                Recipe{" "}
              </button>
              <button className={"p-2 " + (page === "/contact" ? " bg-black rounded text-white" : "")} onClick={contactButton}>Contact us </button>
            </div>
          )}
          {user && (
            <div className="flex  font-bold text-xl">
              <button className=" my-8 px-3 rounded font-bold text-xl hover:bg-black hover:text-white" onClick={handleSignOut}>
              ➜] Sign out{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
