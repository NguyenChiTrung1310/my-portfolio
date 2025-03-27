'use client'
import {AnimatePresence, motion} from 'motion/react'
import React, {PropsWithChildren} from 'react'

import Navbar from '@/components/Navbar'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <AnimatePresence mode='wait'>
        <motion.div className='h-full'>
          <Navbar />
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Layout
