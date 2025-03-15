/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'

const Hero = () => {
  return (
    <section className='hero h-screen'>
      <div className='flex-center relative mx-auto h-screen w-full'>
        <video width='768' height='768' preload='none' autoPlay muted loop className='absolute z-[-1] h-full w-full object-cover'>
          <source src='/hero.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        <div className='flex-between container h-[768px] items-start gap-20 px-10 py-20'>
          <div>
            <h3>
              I&apos;m <span className='text-red-1 font-chakraPetch'>Trung Nguyen</span>{' '}
            </h3>
            <h4>Frontend Developer</h4>
          </div>

          <div className='space-y-6'>
            <div className='flex-between gap-3'>
              <h3 className='text-red-1'>4+</h3>
              <span>
                Years of <br /> experience
              </span>
            </div>
            <div className='flex-between gap-3'>
              <h3 className='text-red-1'>10+</h3>
              <span>
                Projects <br /> completed
              </span>
            </div>
            <div className='flex-between gap-3'>
              <h3 className='text-red-1'>8+</h3>
              <span>
                Technologies <br /> mastered
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
