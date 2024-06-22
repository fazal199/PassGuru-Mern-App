import React, { memo, useEffect } from 'react'
import { usePassword } from '../../context/AppContext.jsx'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {

    const navigate = useNavigate();

    const { setIsUserLoggedIn, isUserLoggedIn, accessToken, setUserPersonalData } = usePassword();

    const makeUserLogout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            console.log(response);

            setIsUserLoggedIn(false);
            setUserPersonalData("");
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            navigate("/auth/signin");
            toast.success("Logout Successfully!", { autoClose: 2000 });
        }
        catch (error) {
            console.log("something went wrong while making user logout!");
            console.log(error);
        }
    }
    useEffect(() => {

        if (isUserLoggedIn)
            makeUserLogout();

        else
            navigate("/");
    }, [])

    return (
        <>
            <div className='flex space-x-2 justify-center items-center bg-white tablet:h-[80vh] h-[83vh] dark:invert'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
            </div>
        </>
    )
}

export default memo(Logout)
