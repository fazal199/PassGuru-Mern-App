import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { usePassword } from '../../context/AppContext'

const Header = () => {

  const { isUserLoggedIn } = usePassword();

  return (
    <header className="bg-slate-800 text-white py-5 px-5">
      <div className="max-w-3xl mx-auto  flex justify-between items-center font-semibold text-2xl">
        <div className="text-3xl tracking-wide mobile-sm:text-2xl">
          PassGuru
        </div>
        <nav className="text-2xl">
          <ul className="flex gap-12 items-center mobile-sm:text-xl mobile:gap-5">
            {isUserLoggedIn && <li><Link to={"/auth/logout"} className="hover:text-gray-300">Signout</Link></li>}
            <li><a href="https://github.com/fazal199" className="hover:text-gray-300">Github</a></li>
          </ul>
        </nav>
      </div>
    </header>

  )
}

export default memo(Header)
