import React, {PropsWithChildren} from 'react'

import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import TopLeftImg from '@/components/TopLeftImg'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='page bg-site relative bg-cover bg-no-repeat text-white'>
      <TopLeftImg />
      <Navbar />
      <Header />
      {children}
    </div>
  )
}

export default Layout
