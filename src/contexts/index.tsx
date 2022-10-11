import { CyclesContextProvider } from './CyclesContext'

interface Props {
  children: React.ReactNode
}

export function AppProvider({ children }: Props) {
  return <CyclesContextProvider>{children}</CyclesContextProvider>
}
