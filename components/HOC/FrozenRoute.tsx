'use client'

import {LayoutRouterContext} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {PropsWithChildren, useContext, useRef} from 'react'

const FrozenRoute = ({children}: PropsWithChildren) => {
  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current

  return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>
}

export default FrozenRoute
