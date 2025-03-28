'use client'
import {motion} from 'motion/react'
import React, {PropsWithChildren} from 'react'

import {opacity, perspective, slide} from './motionVariants'

const anim = (variants: any) => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  }
}

const Inner: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='bg-white'>
      <motion.div className='bg-foreground fixed top-0 left-0 z-10 h-screen w-full' {...anim(slide)} />
      <motion.div className='bg-foreground' {...anim(perspective)}>
        <motion.div {...anim(opacity)}>{children}</motion.div>
      </motion.div>
    </div>
  )
}

export default Inner
