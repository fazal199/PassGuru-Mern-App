import React, { memo } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { AppContext } from './context/AppContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseProvider } from './context/FirebaseProvider.jsx'

const App = () => {

  return (
    <>
      <AppContext>
        <Header />
        <FirebaseProvider>
          <main>
            <Outlet />
          </main>
        </FirebaseProvider>
        <Footer />
      </AppContext>
      <ToastContainer theme='colored' />
    </>
  )
}

export default memo(App);
