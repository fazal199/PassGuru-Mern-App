import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//creating the context
const appContext = createContext();

//component to provide the context
const AppContext = ({ children }) => {

   const navigate = useNavigate();

   const [isUpdate, setIsUpdate] = useState(false);
   const [userPersonalData, setUserPersonalData] = useState("");

   //state to check if the user is logged in or not!
   const accessToken = localStorage.getItem("accessToken")
   const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!accessToken)

   //state to manage current data of the field
   const [userPassWordData, setUserPassWordData] = useState({
      _id: "",
      siteName: "",
      userName: "",
      password: ""
   })

   //state to manage The UserRecords
   const [userData, setuserData] = useState([])

   //function to add new Entry
   const handleNewEntry = async () => {
      try {
         const { data: userUpdatedData } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/entries/create`, userPassWordData, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${accessToken}`
            }
         })

         setuserData(userUpdatedData.data.userEntries);
         toast.success("New Entry Added!",{autoClose : 2000});

      } catch (error) {
         console.log("something went wrong while creating new entry through api call!");
         toast.error("Record already existed!",{autoClose : 2000});
         console.log(error)
      }

   }

   //function to show the data which the user wants to update
   const updateCurrentFormData = (oldRecord) => {
      let newData = {
         _id: oldRecord._id,
         siteName: oldRecord.appName,
         userName: oldRecord.appUserName,
         password: oldRecord.appUserPassword
      }
      setUserPassWordData(newData);
   }

   //funciton to update the record
   const updateRecord = async () => {
      // console.log(userPassWordData);
      try {

         await axios.patch(`${import.meta.env.VITE_SERVER_URL}/entries/update`, userPassWordData, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${accessToken}`
            }
         })

         toast.success("Record successfully Updated!",{autoClose : 2000});
         setIsUpdate(false);
         fetchUserData();

      } catch (error) {
         console.log("something went wrong while updating the entry through api call!");
         setIsUpdate(false);
         toast.error("Record couldn't be updated!",{autoClose : 2000});

         console.log(error)
      }
   }

   //function to delete the record
   const deleteRecord = async (id) => {
      // console.log(id)
      try {

         await axios.delete(`${import.meta.env.VITE_SERVER_URL}/entries/delete/${id}`, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${accessToken}`
            }
         })

         fetchUserData();
         toast.success("Record successfully deleted!",{autoClose : 2000});
        


      } catch (error) {
         console.log("something went wrong while deleting the entry through api call!");
         console.log(error)
         toast.error("Record couldn't be deleted!",{autoClose : 2000});

      }
   }

   //function to fetch current user data
   const fetchUserData = async () => {

      const options = {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
         }
      }
      const { data: userPersonalDataFromBackend } = await axios.get("http://localhost:3000/api/v1/auth/user", options);
      setUserPersonalData(userPersonalDataFromBackend.data)
      setIsUserLoggedIn(true);
      setuserData(userPersonalDataFromBackend.data.userEntries);
   }

   useEffect(() => {
      if (isUserLoggedIn)
         fetchUserData();

      else
         navigate("/auth/signin");

   }, [accessToken, isUserLoggedIn]);

   return (
      <>
         <appContext.Provider value={{
            userData,
            deleteRecord,
            isUpdate,
            setIsUpdate,
            updateRecord,
            handleNewEntry,
            userPassWordData,
            setUserPassWordData,
            updateCurrentFormData,
            setIsUserLoggedIn,
            isUserLoggedIn,
            accessToken,
            userPersonalData,
            setUserPersonalData,
         }}>
            {children}
         </appContext.Provider>
      </>
   )
}

//hook to get the value of appContext value
const usePassword = () => useContext(appContext);

export {
   AppContext,
   usePassword
}



