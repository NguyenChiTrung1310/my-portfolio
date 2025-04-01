'use client'

import {AlignRight, X} from 'lucide-react'
import {AnimatePresence, motion} from 'motion/react'
import {ReactNode, useState} from 'react'

import {useMediaQuery} from '@/hooks'
import {cn} from '@/lib/utils'

import {menuVariants, toggleMenuVariants} from './motionVariants'
import Nav from './Nav'

const Navbar = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const isTablet = useMediaQuery('(min-width: 640px)')

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  const animate = isActive ? 'open' : 'closed'

  return (
    <nav className='flex w-full items-center'>
      {/* Logo */}
      <div className='font-pp-telegraf pt-6 pl-4 text-4xl leading-none font-normal tracking-[-0.6px]'>TRUNG N.</div>
      {/* Button Toggle Menu */}
      <div className='fixed top-0 right-0 z-50 sm:top-4 sm:right-4'>
        <motion.div
          whileHover={{width: 120}}
          variants={toggleMenuVariants(isTablet)}
          animate={animate}
          initial='closed'
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

        <motion.div className={cn('bg-primary relative')} variants={menuVariants(isTablet)} animate={animate} initial='closed'>
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
