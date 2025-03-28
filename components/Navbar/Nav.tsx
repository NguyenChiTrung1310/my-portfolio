import {motion, useAnimate} from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from 'react'

import {perspective, slideIn} from './motion'

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

const NavLink = ({title, href, index}: {title: string; href: string; index: number}) => {
  const [scope, animate] = useAnimate()
  const outer = useRef(null)
  const inner = useRef(null)

  const animateIn = async (e: any) => {
    const bounds = e.target.getBoundingClientRect()
    const direction = e.clientY < bounds.top + bounds.height / 2 ? -1 : 1

    await animate(outer.current, {top: `${direction * 100}%`}, {duration: 0})
    await animate(inner.current, {top: `${-1 * direction * 100}%`}, {duration: 0})

    animate([outer.current, inner.current], {top: '0%'}, {duration: 0.3})
  }

  const animateOut = (e: any) => {
    const bounds = e.target.getBoundingClientRect()
    const direction = e.clientY < bounds.top + bounds.height / 2 ? -1 : 1

    animate(outer.current, {top: `${direction * 100}%`}, {duration: 0.3})
    animate(inner.current, {top: `${-1 * direction * 100}%`}, {duration: 0.3})
  }

  return (
    <motion.div
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
      ref={scope}
      className='nav-link-container flex-center cursor-pointer border-t border-white perspective-[120px] perspective-origin-bottom'
    >
      <motion.div custom={index} variants={perspective} initial='initial' animate='enter' exit='exit' className='w-full'>
        <Link className='text-4xl font-medium text-white no-underline' href={href}>
          {title}
        </Link>

        <div ref={outer} className='outer'>
          <div ref={inner} className='inner'>
            {[...Array(2)].map((_, index) => {
              return <SliderContent key={index} />
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const SliderContent = () => {
  return (
    <div className='container'>
      <div className='imageContainer'>
        <Image src='/haha.jpg' fill alt='image text' />
      </div>
      <p>H HAHA OKOK MAMA</p>
      <div className='imageContainer'>
        <Image src='/haha.jpg' fill alt='image text' />
      </div>
      <p>H HAHA OKOK MAMA</p>
    </div>
  )
}

const Nav = () => {
  return (
    <div className='box-border flex h-full flex-col justify-between pt-24 pr-10 pb-12 pl-10'>
      <div className='flex flex-col gap-2.5'>
        {links.map((link, i) => (
          <NavLink key={`b_${i}`} {...link} index={i} />
        ))}
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
