import React, { memo } from 'react'
import PasswordForm from './PasswordForm/PasswordForm'
import DataTable from './DataTable/DataTable'

const Home = () => {
  
  return (
    <section className="max-w-5xl mx-auto py-20 px-10 mobile:px-3 mobile-sm:px-5">
      <PasswordForm/>
      <DataTable/>
    </section>
  )
}

export default memo(Home)
