import React, { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { usePassword } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useFirebase } from '../../context/FirebaseProvider';


const SignUp = () => {

  const navigate = useNavigate();
  const { setIsUserLoggedIn } = usePassword();
  const { getUserDataFromGoogle } = useFirebase();

  //state to manage fields
  const [userCredentials, setUserCredentials] = useState({
    userName: "",
    userEmail: "",
    userPassword: ""
  })

  //function to manage user changes which is done on fields
  const handleUserCredentials = (name, newValue) => {
    const newCredentials = { ...userCredentials };
    newCredentials[name] = newValue;
    setUserCredentials(newCredentials);
  }

  //function to manage to submit action
  const handleSubmit = async (e, fromGoogle = false) => {

    let userCredentialsFromGoogle;

    if (fromGoogle) {
      let { userName, userEmail } = await getUserDataFromGoogle();
      userCredentialsFromGoogle = {
        userName,
        userEmail,
        userPassword: Math.floor(Math.random() * 100000)
      }
    }

    else
      e.preventDefault();

    try {
      const { data: userSignUpData } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, fromGoogle ? userCredentialsFromGoogle : userCredentials)

      localStorage.setItem("accessToken", userSignUpData.data.accessToken)
      localStorage.setItem("refreshToken", userSignUpData.data.refreshToken)
      setIsUserLoggedIn(true);
      navigate("/");
      toast.success("Signup Successfully!", { autoClose: 2000 });

    } catch (error) {
      console.log("something went wrong while signup the user!")
      console.log(error);
      toast.error(error.response.data.message || "something went wrong while signUp", { autoClose: 2000 });
    }
  }

  return (
    <div className="z-10 py-5 px-9 block w-full mobile:px-5">
      <div className="text-center">
        <h2 className="mt-6 text-5xl font-bold text-gray-900 tablet:text-4xl mobile:text-3xl mobile-sm:text-3xl">
          Welcome To PassGuru!
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Now You Don't Need To Remember Your Passwords!
        </p>
      </div>
      <form className="mt-10 space-y-6 max-w-sm mx-auto">
        <div className="relative">
          <label className="text-sm font-bold text-gray-700 tracking-wide">Username</label>
          <input required onChange={({ target }) => handleUserCredentials(target.name, target.value)} value={userCredentials.userName} type="text" name="userName"  className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="foobar432" />
        </div>
        <div className="relative">
          <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
          <input  onChange={({ target }) => handleUserCredentials(target.name, target.value)} value={userCredentials.userEmail} type="email" name="userEmail" required className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="mail@gmail.com" />
        </div>
        <div className="mt-8 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
          <input onChange={({ target }) => handleUserCredentials(target.name, target.value)} value={userCredentials.userPassword} type="password" name="userPassword" className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your password" />
        </div>
        <div>
          <button onClick={(e) => handleSubmit(e)} type="submit" className="w-full flex justify-center bg-black text-white p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline text-lg shadow-lg cursor-pointer transition ease-in duration-300">Register</button>
        </div>
        <div>
          <button onClick={(e) => handleSubmit(e, true)} className="w-full flex justify-center bg-black text-white p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline  shadow-lg cursor-pointer transition ease-in duration-300">SignUp With Google
            <FcGoogle className="relative text-3xl left-2 -top-[1px]" />
          </button>
        </div>
        <p className="flex flex-row gap-3 items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Already have an account?</span>
          <Link to="/auth/signin" className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300 font-semibold">Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default memo(SignUp)
