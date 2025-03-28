'use client'
import React, {PropsWithChildren} from 'react'

import PageAnimatePresence from '@/components/HOC/PageAnimatePresence'
import Navbar from '@/components/Navbar'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <Navbar />
      <PageAnimatePresence>{children}</PageAnimatePresence>
    </div>
  )
}

export default Layout
