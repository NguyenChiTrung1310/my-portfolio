'use client'

import {motion} from 'motion/react'
import {usePathname} from 'next/navigation'
import React, {PropsWithChildren, useEffect, useState} from 'react'

import {links} from '../Navbar/data'
import {curve, text, translate} from './motionVariants'

const anim = (variants: any) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  }
}

const Curve: React.FC<PropsWithChildren> = ({children}) => {
  const pathname = usePathname()

  const [dimensions, setDimensions] = useState<{width: number | null; height: number | null}>({
    width: null,
    height: null,
  })

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const activeLink = links.find((item) => item.href === pathname)

  return (
    <div className='curve'>
      <div
        style={{opacity: dimensions.width == null ? 1 : 0}}
        className='bg-primary pointer-events-none fixed top-0 left-0 h-screen w-full transition-opacity delay-75 delay-100 duration-0 ease-linear'
      />
      <motion.p className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 transform text-center text-5xl text-white' {...anim(text)}>
        {activeLink?.title}
      </motion.p>
      {dimensions.width != null && <SVG {...dimensions} />}
      {children}
    </div>
  )
}

const SVG = ({height, width}: any) => {
  const initialPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `

  return (
    <motion.svg {...anim(translate)} xmlns='http://www.w3.org/2000/svg'>
      {/* Gradient Definition */}
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#ffffff' />
          <stop offset='100%' stopColor='#171717' />
        </linearGradient>
      </defs>

      {/* Animated Path with Gradient Fill */}
      <motion.path {...anim(curve(initialPath, targetPath))} fill='url(#gradient)' />
    </motion.svg>
  )
}

export default Curve
