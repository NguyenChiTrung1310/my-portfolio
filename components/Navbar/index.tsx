'use client'

import {AlignRight, X} from 'lucide-react'
import {motion} from 'motion/react'
import {ReactNode, useState} from 'react'

const Navbar = () => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  return (
    <nav className='w-full'>
      <div className='flex items-center justify-between'>
        <div>Left</div>
        <div>Center</div>
        <div className='fixed top-6 right-6'>
          <div className='absolute top-0 right-0 z-10 h-10 w-10 cursor-pointer overflow-hidden rounded-full'>
            <motion.div className='relative h-full w-full' animate={{top: isActive ? '-100%' : '0%'}} transition={{duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1]}}>
              <div className='slider-text' onClick={toggleMenu}>
                <PerspectiveText icon={<AlignRight />} label='Menu' />
              </div>

              <div className='slider-text' onClick={toggleMenu}>
                <PerspectiveText icon={<X />} label='Close' />
              </div>
            </motion.div>
          </div>

          <motion.div className='bg-primary relative h-[640px] w-[360px] rounded-3xl' variants={menu} animate={isActive ? 'open' : 'closed'} initial='closed' />
        </div>
      </div>
    </nav>
  )
}

const PerspectiveText = ({icon, label}: {icon: ReactNode; label: string}) => {
  return (
    <div className='perspective-icon'>
      <div className='icon'>{icon}</div>

      <div className='icon'>{icon}</div>
    </div>
  )
}

const menu = {
  open: {
    width: '360px',
    height: '650px',
    top: '-12px',
    right: '-12px',
    transition: {duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },

  closed: {
    width: '40px',
    height: '40px',
    top: '0px',
    right: '0px',
    transition: {duration: 0.75, delay: 0.35, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },
}

export default Navbar
