import { useRef, useState } from "react";
import validator from "../utilis/validator";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utilis/firebase";
import { addUser } from "../utilis/userSlice";
import { useDispatch } from "react-redux";
import { USER_AVATAR } from "../utilis/constants";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

let para1: string = "";
let para2: string = "";
let para3: string = "";
let para4: string = "";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(true);
  const [message, setMessage] = useState<string | null>("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConPassword, setIsShowConPassword] = useState(false);
  const dispatch = useDispatch();

  const LoginType = () => {
    setIsSignIn(!isSignin);
  };
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);
  const confirmPassword = useRef<HTMLInputElement | null>(null);

  const checkValidator = (e: React.FormEvent) => {
    e.preventDefault();
    para1 = email?.current?.value ?? "";
    para2 = password.current?.value ?? "";
    para3 = name.current?.value ?? "";
    para4 = confirmPassword.current?.value ?? "";

    setMessage(validator(para1, para2));

    if (message) return;
    if (!isSignin && para4 != para2) {
      setMessage("Password doesn't Match");
      console.log("yess");
      return;
    }

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
          setMessage(errorCode );
        });
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#f8f7f3]">
      <form className=" w-min-[390px] py-5 bg-white p-4 flex flex-col justify-center items-center md:border border-gray-300 gap-4 md:gap-7 rounded-2xl md:shadow-2xl">
        <h1 className="font-bold text-2xl md:text-4xl"> {isSignin ? "Sign In" : "Sign Up"} </h1>
        <div className="flex flex-col gap-3 md:gap-5">
          {!isSignin && <input className="p-3 px-4 bg-[#f8f7f3] border-gray-300 border rounded-2xl" ref={name} type="text" placeholder="Name" />}
          <input className="p-3 px-4 border bg-[#f8f7f3] border-gray-300 rounded-2xl" ref={email} type="text" placeholder="Email Address" />

          <div className="relative w-full">
            <input ref={password} type={isShowPassword ? "text" : "password"} placeholder="Password" className="p-3 px-4 pr-12 w-full border bg-[#f8f7f3] border-gray-300 rounded-2xl" />

            <button type="button" onClick={() => setIsShowPassword(!isShowPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600">
              {isShowPassword ? <LuEye /> : <LuEyeClosed />}
            </button>
          </div>

          {!isSignin && (
            <div className="relative w-full">
              <input ref={confirmPassword} type={isShowPassword ? "text" : "password"} placeholder="Confirm Password" className="p-3 px-4 pr-12 w-full bg-[#f8f7f3] border-input" />

              <button type="button" onClick={() => setIsShowConPassword(!isShowConPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600">
                {isShowConPassword ? <LuEye /> : <LuEyeClosed />}
              </button>
            </div>
          )}
          <p className={message ? " text-gray-500 " : "hidden"}>{message}</p>
        </div>

        <button onClick={(e) => checkValidator(e)} className="w-full bg-green-500  rounded-2xl hover:bg-green-400 text-white rounded px-8 py-2 text-xl hover:bg-gray-400">
          {isSignin ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer text-gray-700" onClick={LoginType}>
          {" "}
          {isSignin ? "New? Sign Up Now" : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
