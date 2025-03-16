'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'
import {HiChatBubbleBottomCenterText, HiEnvelope, HiHome, HiRectangleGroup, HiUser, HiViewColumns} from 'react-icons/hi2'

import {cn} from '@/lib/utils'

export const navData = [
  {name: 'home', path: '/', icon: <HiHome />},
  {name: 'about', path: '/about', icon: <HiUser />},
  {name: 'services', path: '/services', icon: <HiRectangleGroup />},
  {name: 'work', path: '/work', icon: <HiViewColumns />},
  {
    name: 'testimonials',
    path: '/testimonials',
    icon: <HiChatBubbleBottomCenterText />,
  },
  {
    name: 'contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='fixed top-0 bottom-0 z-50 mt-auto flex h-max w-full flex-col items-center gap-y-4 xl:right-[2%] xl:h-screen xl:w-16 xl:max-w-md xl:justify-center'>
      <div className='flex h-[80px] w-full items-center justify-between gap-y-10 bg-white/10 px-4 py-8 text-3xl backdrop:blur-sm md:px-40 xl:h-max xl:flex-col xl:justify-center xl:rounded-full xl:px-0 xl:text-xl'>
        {navData.map((link) => (
          <Link className={cn(link.path === pathname && 'text-accent')} key={link.name} href={link.path}>
            <div>{link.icon}</div>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
