'use client'

import ShaderText from '@/components/ShaderText'
import Curve from '@/components/Transitions/Curve'

export default function Home() {
  return (
    <Curve>
      <ShaderText text='trung' size={780} width={480} height={520} />
    </Curve>
  )
}
