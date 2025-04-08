'use client'

import InversionLens from '@/components/InversionLens'
import Curve from '@/components/Transitions/Curve'

export default function Home() {
  return (
    <Curve>
      <div className='relative'>
        <InversionLens src='/haha.jpg' />
        <div className='h-screen'>AB BABABAB</div>
      </div>
    </Curve>
  )
}
