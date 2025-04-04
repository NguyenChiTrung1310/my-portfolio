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
    <motion.svg {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} fill='#56b8ff' />
    </motion.svg>
  )
}

export default Curve
