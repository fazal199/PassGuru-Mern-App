import React, { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { usePassword } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useFirebase } from '../../context/FirebaseProvider';

const SignIn = () => {

  const navigate = useNavigate();
  const { setIsUserLoggedIn } = usePassword();
  const [userCredentials, setUserCredentials] = useState({
    userEmail: "",
    userPassword: ""
  })

  const { getUserDataFromGoogle } = useFirebase();

  const handleUserCredentials = (name, newValue) => {
    const newCredentials = { ...userCredentials };
    newCredentials[name] = newValue;
    setUserCredentials(newCredentials);
  }

  const handleSubmit = async (e, fromGoogle = false) => {

    let userCredentialsFromGoogle;

    if (fromGoogle) {
      let { userEmail } = await getUserDataFromGoogle();
      userCredentialsFromGoogle = {userEmail}
    }

    else
      e.preventDefault();

    try {
      const { data: userSignInData } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signin?fromGoogle=${fromGoogle}`, fromGoogle ? userCredentialsFromGoogle : userCredentials)

      localStorage.setItem("accessToken", userSignInData.data.accessToken)
      localStorage.setItem("refreshToken", userSignInData.data.refreshToken)
      setIsUserLoggedIn(true);
      toast.success("Login Successfully!", { autoClose: 2000 });
      navigate("/");

    } catch (error) {
      console.log("something went wrong while signin the user! component:[SignIn]");
      console.log(error);
      toast.error(error.response.data.message || "something went wrong while signIn", { autoClose: 2000 });
    }
  }

  return (
    <div className="z-10 py-10 my-8 px-9 block w-full mobile-sm:px-5">
      <div className="text-center">
        <h2 className="mt-6 text-5xl font-bold text-gray-900 mobile-sm:text-4xl">
          Welcome Back!
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Please sign in to your account
        </p>
      </div>
      <form className="mt-10 space-y-6 max-w-sm mx-auto" action="#" method="POST">
        <div className="relative">
          <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
          <input onChange={({ target }) => handleUserCredentials(target.name, target.value)} value={userCredentials.userEmail} type="email" name="userEmail" required className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="mail@gmail.com" />
        </div>
        <div className="mt-8 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
          <input onChange={({ target }) => handleUserCredentials(target.name, target.value)} value={userCredentials.userPassword} type="password" name="userPassword" className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your password" />
        </div>
        <div>
          <button onClick={(e) => handleSubmit(e)} type="submit" className="w-full flex justify-center bg-black text-white p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline text-lg shadow-lg cursor-pointer transition ease-in duration-300">Login</button>
        </div>
        <div>
          <button onClick={(e) => handleSubmit(e, true)} className="w-full flex justify-center bg-black text-white p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline  shadow-lg cursor-pointer transition ease-in duration-300">SignIn With Google
            <FcGoogle className="relative text-3xl left-2 -top-[1px]" />
          </button>
        </div>
        <p className="flex flex-row gap-3 items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Don't have an account?</span>
          <Link to="/auth/signup" className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300 font-semibold">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default memo(SignIn)
