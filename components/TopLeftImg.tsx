import Image from 'next/image'
import React from 'react'

const TopLeftImg = () => {
  return (
    <div className='mi absolute top-0 left-0 z-10 w-[200px] opacity-50 mix-blend-color-dodge xl:w-[400px]'>
      <Image src='/images/top-left-img.png' alt='top-left-img' width={400} height={400} />
    </div>
  )
}

export default TopLeftImg
