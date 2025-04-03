'use client'
import SpotlightCursor from '@/components/SpotlightCursor'
import Curve from '@/components/Transitions/Curve'

export default function Home() {
  return (
    <Curve>
      <div className='relative'>
        <div className='h-screen'>Hoh-screenme</div>
        <div className='absolute -z-10'>
          <SpotlightCursor />
        </div>
        <div className='h-screen'>AB BABABAB</div>
      </div>
    </Curve>
  )
}
