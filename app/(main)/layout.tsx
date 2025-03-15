import React, {PropsWithChildren} from 'react'

import Navbar from '@/components/Navbar'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
