"use client"

import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"
import { AppStore, makeStore } from "./store"

type StoreProviderProps = {
  children: ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null)

  if (storeRef.current === null) storeRef.current = makeStore()

  return <Provider store={storeRef.current}>{children}</Provider>
}
