import { useRef, useState } from "react";
import validator from "../utilis/validator";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utilis/firebase";
import { addUser } from "../utilis/userSlice";
import { useDispatch } from "react-redux";
import { LOGIN_BG_URL, USER_AVATAR } from "../utilis/constants";

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
   
    if (message) return;

    if (!isSignin) {
      createUserWithEmailAndPassword(auth, para1, para2)
        .then((userCredential) => {
          const user = userCredential.user;
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

  return (
    <div className="h-screen md:grid grid-cols-12 bg-[#f8f7f3]">
      <div className=" col-span-7">
        <img className="hidden md:block -z-5 h-screen object-cover object-center" src={LOGIN_BG_URL} alt="" />

      </div>
      <div className="h-full w-full flex  justify-center items-center col-span-5">
        <form className=" w-[550px] h-[600px] bg-white p-8 flex flex-col justify-center items-center md:border border-gray-300 rounded-2xl md:shadow-2xl">
          <h1 className="w-3/5 font-bold text-2xl mb-10 md:text-4xl"> {isSignin ? "Sign In" : "Sign Up"} </h1>
          <div className="w-3/5 flex flex-col gap-4 md:gap-7">
            {!isSignin && <input className="p-3 px-4 bg-[#f8f7f3] border-gray-300 border rounded-2xl" ref={name} type="text" placeholder="Name" />}
            <input className="p-3 px-4 border bg-[#f8f7f3] border-gray-300 rounded-2xl" ref={email} type="text" placeholder="Email Address" />
            <input className="p-3 px-4 border bg-[#f8f7f3] border-gray-300 rounded-2xl" ref={password} type="password" placeholder="Password" />
            <p className="text-gray-500 ">{message}</p>
          </div>

          <button onClick={(e) => checkValidator(e)} className="bg-green-500  rounded-2xl hover:bg-green-400 text-white rounded px-8 py-2 w-3/5 text-xl hover:bg-gray-400">
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
          <p className="cursor-pointer m-5 text-gray-700" onClick={LoginType}>
            {" "}
            {isSignin ? "New? Sign Up Now" : "Already have an account? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
