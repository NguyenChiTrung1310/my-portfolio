import {motion} from 'motion/react'
import React from 'react'

export const links = [
  {title: 'About Me', href: '/'},
  {title: 'Projects', href: '/'},
  {title: 'Expertise', href: '/'},
]

export const footerLinks = [
  {title: 'Facebook', href: '/'},
  {title: 'LinkedIn', href: '/'},
  {title: 'Instagram', href: '/'},
  {title: 'Github', href: '/'},
]

export const perspective = {
  initial: {
    opacity: 0,
    rotateX: 120,
    translateY: 90,
    translateX: -40,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: {duration: 0.35, delay: 0.4},
    },
  }),
  exit: {
    opacity: 0,
    transition: {duration: 0.5, type: 'linear', ease: [0.76, 0, 0.24, 1]},
  },
}

export const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: {duration: 0.5, type: 'tween', ease: 'easeInOut'},
  },
}

const Nav = () => {
  return (
    <div className='box-border flex h-full flex-col justify-between pt-24 pr-10 pb-12 pl-10'>
      <div className='flex flex-col gap-2.5'>
        {links.map((link, i) => {
          const {title, href} = link

          return (
            <div key={`b_${i}`} className='perspective-[120px] perspective-origin-bottom'>
              <motion.div custom={i} variants={perspective} initial='initial' animate='enter' exit='exit'>
                <a className='text-4xl text-white no-underline' href={href}>
                  {title}
                </a>
              </motion.div>
            </div>
          )
        })}
      </div>

      <motion.div className='flex flex-wrap gap-6'>
        {footerLinks.map((link, i) => {
          const {title, href} = link

          return (
            <motion.a className='mt-1' href={href} variants={slideIn} custom={i} initial='initial' animate='enter' exit='exit' key={`f_${i}`}>
              {title}
            </motion.a>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Nav
