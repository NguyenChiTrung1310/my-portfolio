import {Dot} from 'lucide-react'
import {motion, useAnimate} from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React, {useRef} from 'react'

import {footerLinks, links} from './data'
import {perspectiveVariants, slideInVariants} from './motionVariants'

interface Props {
  toggleMenu: () => void
}

type NavLinkType = {title: string; href: string; description: string}

const NavLink = ({link, index, toggleMenu}: {link: NavLinkType; index: number} & Props) => {
  const pathname = usePathname()
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
      <Link
        onClick={() => {
          if (pathname !== link.href) toggleMenu()
        }}
        className='w-full text-4xl font-medium text-white no-underline'
        href={link.href}
      >
        <motion.div custom={index} variants={perspectiveVariants} initial='initial' animate='enter' exit='exit' className='w-full'>
          <span className='flex items-center'>
            {link.title}{' '}
            {pathname === link.href && (
              <span>
                <Dot className='h-14 w-14' />
              </span>
            )}
          </span>

          <div ref={outer} className='pointer-events-none absolute flex h-full w-full overflow-hidden'>
            <div ref={inner} className='absolute top-full flex h-full bg-black whitespace-nowrap'>
              {[...Array(2)].map((_, index) => {
                return <SliderContent key={`content_${index}`} link={link} />
              })}
            </div>
          </div>
        </motion.div>
      </Link>
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

const Nav: React.FC<Props> = ({toggleMenu}) => {
  return (
    <div className='box-border flex h-full flex-col justify-between pt-24 pr-10 pb-12 pl-10'>
      <div className='flex flex-col'>
        {links.map((link, i) => (
          <NavLink key={`b_${i}`} link={link} index={i} toggleMenu={toggleMenu} />
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
