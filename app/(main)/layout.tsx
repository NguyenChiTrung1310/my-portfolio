'use client'
import {AnimatePresence, motion} from 'motion/react'
import React, {PropsWithChildren} from 'react'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <AnimatePresence mode='wait'>
        <motion.div className='h-full'>{children}</motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Layout
