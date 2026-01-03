import { auth } from "../utilis/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utilis/userSlice";
import { LOGO_URL } from "../utilis/constants";
import { type RootState } from "../utilis/appStore";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }

  return (
    <div className="flex justify-between w-full text-black px-6 fixed">
      {/* <img className="h-28 m-4" src={LOGO_URL} alt="" /> */}
      <h1 className="font-serif text-6xl font-extrabold bg-white m-6 p-4">Food Tracker </h1>
      {user && (
        <div className="flex justify-between items-center gap-4 font-bold text-xl">
          <button className="p-2 px-4"  onClick={recipeButton}>Home </button>
          <button className="p-2 px-4 " onClick={recipeButton}>Calorie Check </button>
          <button className="p-2 px-4 " onClick={recipeButton}>Recipe </button>
          <button className="p-2 px-4  ">Contact us </button>
``
          <div className="flex  font-bold text-xl">
            <button className=" p-2 px-4 rounded font-bold text-xl" onClick={handleSignOut}>
              Sign out{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
