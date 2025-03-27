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
    <nav className='w-full pb-[72px]'>
      <div className='fixed top-4 right-4'>
        <motion.div
          whileHover={{
            width: 120,
          }}
          className='absolute top-0 right-0 z-10 h-14 w-14 cursor-pointer overflow-hidden rounded-full'
        >
          <motion.div className='relative h-full w-full' animate={{top: isActive ? '-100%' : '0%'}} transition={{duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1]}}>
            <div className='slider-text' onClick={toggleMenu}>
              <PerspectiveText icon={<AlignRight />} label='Menu' />
            </div>

            <div className='slider-text' onClick={toggleMenu}>
              <PerspectiveText icon={<X />} label='Close' />
            </div>
          </motion.div>
        </motion.div>

        <motion.div className='bg-primary relative h-[640px] w-[360px]' variants={menu} animate={isActive ? 'open' : 'closed'} initial='closed' />
      </div>
    </nav>
  )
}

const PerspectiveText = ({icon, label}: {icon: ReactNode; label: string}) => {
  return (
    <div className='perspective-icon'>
      <div className='icon'>{icon}</div>
      <div className='icon'>{label}</div>
    </div>
  )
}

const menu = {
  open: {
    width: '360px',
    height: '650px',
    top: '-12px',
    right: '-12px',
    borderRadius: '24px',
    transition: {duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },

  closed: {
    width: '56px',
    height: '56px',
    top: '0px',
    right: '0px',
    borderRadius: '50px',
    transition: {duration: 0.75, delay: 0.35, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },
}

export default Navbar
