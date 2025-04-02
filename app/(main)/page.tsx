'use client'
import GridDistortion from '@/components/Hero'
import Curve from '@/components/Transitions/Curve'

export default function Home() {
  return (
    <Curve>
      <div className='relative h-screen'>
        Home
        <GridDistortion imageSrc='https://picsum.photos/1920/1080?grayscale' grid={33} mouse={0.1} strength={0.15} relaxation={0.9} className='custom-class' />
      </div>
    </Curve>
  )
}
