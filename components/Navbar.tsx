'use client'
import {motion, useMotionValueEvent, useScroll} from 'motion/react'
import {useState} from 'react'

import {cn} from '@/lib/utils'

import {Button} from './ui/button'

const MotionBtn = motion(Button)

const Navbar = () => {
  const {scrollY} = useScroll()
  const [hidden, setHidden] = useState<boolean>(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    if (previous && latest > previous && latest > 120) setHidden(true)
    else setHidden(false)
  })

  return (
    <motion.nav
      variants={{
        visible: {y: 0},
        hidden: {y: '-138%'},
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{duration: 0.3, ease: 'easeInOut'}}
      className='navbar fixed top-6 left-1/2 z-[9999] container mx-auto h-16 w-full -translate-x-1/2 transform px-6'
    >
      <div className='flex-between h-full gap-10'>
        <ul className='flex items-center justify-end gap-24 font-medium'>
          <li>Home</li>
          <li>About</li>
          <li>Lab</li>
        </ul>

        <div className='flex items-center gap-6'>
          <div>Dark mode</div>
          <MotionBtn
            whileTap={{scale: 0.9}}
            whileHover={{scale: 1.1}}
            transition={{type: 'spring', stiffness: 400, damping: 10}}
            className={cn(!hidden && 'drop-shadow-white', 'btn-bg-linear')}
          >
            Contact me
          </MotionBtn>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
