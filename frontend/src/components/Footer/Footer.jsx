import React, { memo } from 'react'
import {usePassword} from "../../context/AppContext"

const Footer = () => {


  return (
    <footer className="text-center text-xl font-semibold capitalize py-3 bg-slate-800 text-white hover:text-gray-300 cursor-pointer">
      all rights reserved 2024 &copy;
    </footer>
  )
}

export default memo(Footer)
