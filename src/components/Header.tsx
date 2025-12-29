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

  return (
    <div className="flex justify-between w-full px-6 ">
      <img className="h-28 m-4" src={LOGO_URL} alt="" />
      {user && (
        <div className="flex justify-between items-center gap-4 font-bold text-xl">
          <div className="p-2 px-4 bg-green-500 rounded ">Contact us </div>

          <div className="flex  font-bold text-xl">
            <button className=" p-2 px-4 bg-green-500 rounded font-bold text-xl" onClick={handleSignOut}>
              Sign out{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
