'use client'

import {AlignRight, X} from 'lucide-react'
import {AnimatePresence, motion} from 'motion/react'
import {ReactNode, useState} from 'react'

import {menuVariants} from './motionVariants'
import Nav from './Nav'

const Navbar = () => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  return (
    <nav className='w-full'>
      <div className='fixed top-4 right-4 z-50'>
        <motion.div
          whileHover={{
            width: 120,
          }}
          className='absolute top-0 right-0 z-10 h-12 w-12 cursor-pointer overflow-hidden rounded-full'
        >
          <motion.div className='relative h-full w-full' animate={{top: isActive ? '-100%' : '0%'}} transition={{duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1]}}>
            <div className='btn-toggle-text' onClick={toggleMenu}>
              <PerspectiveText icon={<AlignRight />} label='Menu' />
            </div>

            <div className='btn-toggle-text' onClick={toggleMenu}>
              <PerspectiveText icon={<X />} label='Close' />
            </div>
          </motion.div>
        </motion.div>

        <motion.div className='bg-primary relative h-[640px] w-[480px]' variants={menuVariants} animate={isActive ? 'open' : 'closed'} initial='closed'>
          <AnimatePresence>{isActive && <Nav toggleMenu={toggleMenu} />}</AnimatePresence>
        </motion.div>
      </div>
    </nav>
  )
}

const PerspectiveText = ({icon, label}: {icon: ReactNode; label: string}) => {
  return (
    <div className='perspective-icon flex-center h-full w-full flex-col'>
      <div className='icon'>{icon}</div>
      <div className='icon'>{label}</div>
    </div>
  )
}

export default Navbar
