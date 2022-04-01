import { createContext, ReactNode, useState } from 'react'

type VsCurrencyType = {
  vsCurrency: string
  setVsCurrency: (newValue: string) => void
}

const initialValue: VsCurrencyType = {
  vsCurrency: 'usd',
  setVsCurrency: () => {},
}

export const VsCurrencyContext = createContext<VsCurrencyType>(initialValue)

type VsCurrencyContextProps = {
  children: ReactNode
}

export const VsCurrencyContextProvider = ({
  children,
}: VsCurrencyContextProps) => {
  const [vsCurrency, setVsCurrency] = useState(initialValue.vsCurrency)

  return (
    <VsCurrencyContext.Provider value={{ vsCurrency, setVsCurrency }}>
      {children}
    </VsCurrencyContext.Provider>
  )
}
