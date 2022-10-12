import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { differenceInSeconds } from 'date-fns'

import { cyclesReducer, Cycle } from '../reducers/cycles/reducers'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction
} from '../reducers/cycles/actions'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleID: string | null
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
}

interface Props {
  children: React.ReactNode
}

const localStorageKey = '@ignite-timer:cycles-state:v1.0'
const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({ children }: Props) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleID: null
    },
    loadDataFromLocalStorage
  )

  const { cycles, activeCycleID } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    // Para corrigir o delay do timer ao dar F5 na página
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle = {
      id: uuidv4(),
      task,
      minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function loadDataFromLocalStorage() {
    const storedStateAsJSON = localStorage.getItem(localStorageKey)

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(localStorageKey, stateJSON)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleID,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished
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
