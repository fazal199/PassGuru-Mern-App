import React, { memo, useRef, useState } from 'react'
import { usePassword } from '../../../context/AppContext';

const PasswordForm = () => {

  const { isUpdate, setIsUpdate, updateRecord, handleNewEntry, userPassWordData, setUserPassWordData, userPersonalData } = usePassword();

  const handleUserPasswordData = (name, newValue) => {
    const newUserPassWordData = { ...userPassWordData };
    newUserPassWordData[name] = newValue;
    setUserPassWordData(newUserPassWordData);
  }

  const handleCancel = () => {
    setIsUpdate(false);
    setUserPassWordData({
      siteName: "",
      userName: "",
      password: ""
    });
  }


  return (
    <>
      {userPersonalData.length != 0 && <h1 className="text-center capitalize font-semibold text-5xl mb-9 tracking-wide tablet:text-4xl mobile:text-3xl mobile-sm:text-2xl mobile-sm:mb-5">Welcome {userPersonalData.username}!</h1>}
      <h3 className="text-center font-semibold text-4xl mb-9 tracking-wide tablet:text-3xl mobile:text-3xl mobile-sm:text-xl mobile-sm:mb-6">{isUpdate ? "Enter New Data!" : "Manage Your Passwords Here!"}</h3>

      <div className="w-[99%] mx-auto grid grid-cols-2 auto-rows-auto gap-x-5 gap-y-8 mobile:grid-cols-1">
        <input onChange={({ target }) => handleUserPasswordData(target.name, target.value)} className="text-center shadow-md shadow-black py-3 px-5 box-border rounded-xl focus:bg-slate-300 focus:outline-none" type="text" name="siteName" value={userPassWordData.siteName} placeholder="Enter Your Website/App Name" />

        <input onChange={({ target }) => handleUserPasswordData(target.name, target.value)} className='text-center shadow-md shadow-black py-3 px-5 box-border rounded-xl focus:bg-slate-300 focus:outline-none' type="text" name="userName" value={userPassWordData.userName} placeholder="Enter Your Userame/Email" />

        <input onChange={({ target }) => handleUserPasswordData(target.name, target.value)} className="col-span-2 text-center shadow-md shadow-black py-3 px-5 box-border rounded-xl focus:bg-slate-300 focus:outline-none mobile:col-span-1" type="text" name="password" value={userPassWordData.password} placeholder="Enter Your Password" />
      </div>

      {/* button to add the entry */}
      {!isUpdate && <button onClick={handleNewEntry} className={`mt-8 shadow-md shadow-black cursor-pointer w-5/6 mx-auto block font-semibold text-xl transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mobile:w-full`}>Add</button>
      }

      {/* button to save the entry */}
      {isUpdate && <button onClick={updateRecord} className={`mt-8 shadow-md shadow-black cursor-pointer w-5/6 mx-auto block font-semibold text-xl transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-green-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mobile:w-full`}>Save</button>
      }

      {/* button to cancel the entry */}
      {isUpdate && <button onClick={handleCancel} className={`mt-8 shadow-md shadow-black cursor-pointer w-5/6 mx-auto block font-semibold text-xl transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mobile:w-full`}>Cancel</button>
      }
    </>
  )

}

export default memo(PasswordForm)
