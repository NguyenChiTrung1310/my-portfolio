'use client'
import {motion, useMotionValueEvent, useScroll} from 'motion/react'
import {useState} from 'react'

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
        hidden: {y: '-100%'},
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{duration: 0.3, ease: 'easeInOut'}}
      className='bg-primary sticky top-0 z-[9999] h-16 w-full shadow-2xl'
    >
      <ul className='container mx-auto flex h-full items-center justify-end gap-24'>
        <li>Home</li>
        <li>About</li>
        <li>Lab</li>
      </ul>
    </motion.nav>
  )
}

export default Navbar
