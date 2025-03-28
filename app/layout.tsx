import './globals.scss'

import ReactLenis from 'lenis/react'
import type {Metadata} from 'next'
import {Montserrat, Sora} from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Portfolio - Trung Nguyen',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.variable} ${sora.variable} antialiased`}>
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  )
}
