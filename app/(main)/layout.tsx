'use client'
import {AnimatePresence, motion} from 'motion/react'
import {usePathname} from 'next/navigation'
import React, {PropsWithChildren, useEffect, useState} from 'react'

import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import TopLeftImg from '@/components/TopLeftImg'
import Transition from '@/components/Transition'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const pathname = usePathname()
  const [showChildren, setShowChildren] = useState<boolean>(false)

  useEffect(() => {
    setShowChildren(false) // Hide page while transition runs
  }, [pathname])

  return (
    <div className='page bg-site relative bg-cover bg-no-repeat text-white'>
      <TopLeftImg />
      <Navbar />
      <Header />
      <AnimatePresence mode='wait'>
        <motion.div key={pathname} className='h-full'>
          <Transition onComplete={setShowChildren} />
          {showChildren && children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Layout
