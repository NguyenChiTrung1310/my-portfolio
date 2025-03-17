'use client'
import {useAnimate} from 'motion/react'
import React, {useCallback, useEffect} from 'react'

const transitionLeftVariants = {
  x: ['100%', '0%'],
  width: ['100%', '0%'],
  easing: 'ease-in-out',
}

const transitionRightVariants = {
  x: ['0%', '100%'],
  width: ['0%', '100%'],
  easing: 'ease-in-out',
}

interface Props {
  onComplete: (value: boolean) => void
}

const Transition: React.FC<Props> = ({onComplete}) => {
  const [scope, animate] = useAnimate()

  const moveLeft = useCallback((item: number, delay = 0) => animate(`.transition-${item}`, transitionLeftVariants, {duration: 0.6, delay}), [animate])
  const moveRight = useCallback((item: number, delay = 0) => animate(`.transition-${item}`, transitionRightVariants, {duration: 0.6, delay}), [animate])

  useEffect(() => {
    const runAnimation = async () => {
      // Step 1: Move all to the right together
      await Promise.all([moveRight(1), moveRight(2), moveRight(3)])

      // Step 2: Move back to the left with delays
      await Promise.all([moveLeft(1, 0), moveLeft(2, 1 * 0.2), moveLeft(3, 2 * 0.2)])

      onComplete(true)
    }

    runAnimation()
  }, [onComplete, moveLeft, moveRight])

  return (
    <div ref={scope}>
      <div className='transition-1 fixed top-0 right-full bottom-0 z-30 h-screen w-screen bg-[#2e2257]' />
      <div className='transition-2 fixed top-0 right-full bottom-0 z-20 h-screen w-screen bg-[#3b2d71]' />
      <div className='transition-3 fixed top-0 right-full bottom-0 z-10 h-screen w-screen bg-[#4a3792]' />
    </div>
  )
}

export default Transition
