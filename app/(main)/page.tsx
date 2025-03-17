export default function Home() {
  return (
    <section className='bg-primary/60 h-full'>
      <div className='from-primary/10 h-full w-full bg-gradient-to-r via-black/30 to-black/10'>
        <div className='container mx-auto flex h-full flex-col justify-center text-center xl:pt-40 xl:text-left'>
          <h1>
            Hello. I am <span className='text-accent'>Trung Nguyen</span>
          </h1>
          <div className='mx-auto mb-10 max-w-sm xl:mx-0 xl:mb-16 xl:max-w-xl'>I&apos;m a Frontend Developer</div>
        </div>
      </div>
    </section>
  )
}
