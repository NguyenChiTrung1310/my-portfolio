'use client'
import React, {PropsWithChildren} from 'react'

import PageAnimatePresence from '@/components/HOC/PageAnimatePresence'
import Navbar from '@/components/Navbar'
import SpotlightCursor from '@/components/SpotlightCursor'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <Navbar />
      <div className='absolute -z-10'>
        <SpotlightCursor />
      </div>
      <PageAnimatePresence>{children}</PageAnimatePresence>
    </div>
  )
}

export default Layout
