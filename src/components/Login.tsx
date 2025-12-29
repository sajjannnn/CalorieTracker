import { useRef, useState } from "react";
import Header from "./Header";
import validator from "../utilis/validator";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utilis/firebase";
import { addUser } from "../utilis/userSlice";
import { useDispatch } from "react-redux";
import { USER_AVATAR } from "../utilis/constants";
// import {USER_AVATAR} from "../utilis/contants";

let para1: string = "";
let para2: string = "";
let para3: string = "";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(true);
  const [message, setMessage] = useState<string | null>("");
  const dispatch = useDispatch();

  const LoginType = () => {
    setIsSignIn(!isSignin);
  };
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);

  const checkValidator = (e: React.FormEvent) => {
    e.preventDefault();
    para1 = email?.current?.value ?? "";
    para2 = password.current?.value ?? "";
    para3 = name.current?.value ?? "";

    setMessage(validator(para1, para2));
    // console.log(email.current?.value);
    // console.log(password.current?.value);
    if (message) return;

    if (!isSignin) {
      createUserWithEmailAndPassword(auth, para1, para2)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: para3,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const currentUser = auth.currentUser;
              if (currentUser) {
                const { uid, email, displayName, photoURL } = currentUser;
                dispatch(addUser({ uid: uid, email: email || "", displayName: displayName || "", photoURL: photoURL || "" }));
              }
            })
            .catch((error) => {
              setMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, para1, para2)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + errorMessage);
        });
    }
  };

  // } else {
  // }
  return (
    <div>
      <div>
        <Header />
        {/* <img className="absolute h-full w-full object-cover md:object-center" src={BG_URL} alt="" /> */}

      </div>
      <div className="h-full w-full text-white absolute z-5 flex  justify-center items-center">
        <form className="z-6 flex h-2/4 w-11/12 md:w-1/4 flex-col items-center justify-center gap-4 md:gap-10 bg-black/70">
          <h1 className="font-bold text-2xl md:text-5xl"> {isSignin ? "Sign In" : "Sign Up"} </h1>
          <div className="w-3/5 flex flex-col gap-4 md:gap-7">
            {!isSignin && <input className="p-3 px-4 bg-black border" ref={name} type="text" placeholder="Name" />}
            <input className="p-3 px-4 bg-black border" ref={email} type="text" placeholder="Email Address" />
            <input className="p-3 px-4 bg-black border" ref={password} type="password" placeholder="Password" />
            <p>{message}</p>
          </div>

          <button onClick={(e) => checkValidator(e)} className="bg-red-700 rounded px-8 py-2 w-3/5 md:text-2xl font-bold">
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
          <p className="cursor-pointer" onClick={LoginType}>
            {" "}
            {isSignin ? "New? Sign Up Now" : "Already have an account? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
