import { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycles {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  activeCycle: Cycles | undefined
  activeCycleID: string | null
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  markAsFinishedCycle: () => void
}

interface Props {
  children: React.ReactNode
}

const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({ children }: Props) {
  const [cycles, setCycles] = useState<Cycles[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)

  const createNewCycle = useCallback(
    ({ task, minutesAmount }: CreateCycleData) => {
      const newCycle: Cycles = {
        id: uuidv4(),
        task,
        minutesAmount,
        startDate: new Date()
      }

      setCycles((state) => [...state, newCycle])
      setActiveCycleID(newCycle.id)
      setAmountSecondsPassed(0)
      // reset()
    },
    []
  )

  const interruptCurrentCycle = useCallback(() => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return {
            ...cycle,
            interruptedDate: new Date()
          }
        } else {
          return cycle
        }
      })
    )
    setActiveCycleID(null)
  }, [activeCycleID])

  const markAsFinishedCycle = useCallback(() => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return {
            ...cycle,
            finishedDate: new Date()
          }
        } else {
          return cycle
        }
      })
    )
  }, [activeCycleID])

  const setSecondsPassed = useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds)
  }, [])

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleID,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        markAsFinishedCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export function useCyclesContext() {
  const context = useContext(CyclesContext)

  if (!context) {
    throw new Error(
      'useCyclesContext must be used within CyclesContextProvider.'
    )
  }

  return context
}
