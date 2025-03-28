import {motion, useAnimate} from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from 'react'

import {footerLinks, links} from './data'
import {perspectiveVariants, slideInVariants} from './motion'

type NavLinkType = {title: string; href: string; description: string}

const NavLink = ({link, index}: {link: NavLinkType; index: number}) => {
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
      className='nav-link-container group flex-center cursor-pointer border-t border-white py-3 perspective-[120px] perspective-origin-bottom'
    >
      <motion.div custom={index} variants={perspectiveVariants} initial='initial' animate='enter' exit='exit' className='w-full'>
        <Link className='text-4xl font-medium text-white no-underline' href={link.href}>
          {link.title}
        </Link>

        <div ref={outer} className='pointer-events-none absolute flex h-full w-full overflow-hidden'>
          <div ref={inner} className='absolute top-full flex h-full bg-black whitespace-nowrap'>
            {[...Array(2)].map((_, index) => {
              return <SliderContent key={`content_${index}`} link={link} />
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const SliderContent = ({link}: {link: NavLinkType}) => {
  return (
    <div className='slider-content relative flex items-center opacity-0 group-hover:opacity-100'>
      <p className='text-primary text-2xl font-medium'>{link.description}</p>
      <div className='relative mx-10 flex h-12 w-24 overflow-hidden rounded-xl'>
        <Image src='/haha.jpg' fill alt='image text' className='object-cover' />
      </div>
      <p className='text-primary text-2xl font-medium'>{link.description}</p>
      <div className='relative mx-10 flex h-12 w-24 overflow-hidden rounded-xl'>
        <Image src='/haha.jpg' fill alt='image text' className='object-cover' />
      </div>
    </div>
  )
}

const Nav = () => {
  return (
    <div className='box-border flex h-full flex-col justify-between pt-24 pr-10 pb-12 pl-10'>
      <div className='flex flex-col'>
        {links.map((link, i) => (
          <NavLink key={`b_${i}`} link={link} index={i} />
        ))}
      </div>

      <motion.div className='flex flex-wrap gap-6'>
        {footerLinks.map((link, i) => {
          const {title, href} = link

          return (
            <motion.a className='mt-1' href={href} variants={slideInVariants} custom={i} initial='initial' animate='enter' exit='exit' key={`f_${i}`}>
              {title}
            </motion.a>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Nav
