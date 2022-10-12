import {
  createContext,
  useCallback,
  useContext,
  useState,
  useReducer
} from 'react'
import { v4 as uuidv4 } from 'uuid'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleID: string | null
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  markAsFinishedCycle: () => void
}

interface CycleStateReducer {
  cycles: Cycle[]
  activeCycleID: string | null
}

interface Props {
  children: React.ReactNode
}

const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({ children }: Props) {
  const [cyclesState, dispatch] = useReducer(
    (state: CycleStateReducer, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleID: action.payload.newCycle.id
          }

        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            cycles: state.cycles.map((currentCycle) => {
              if (currentCycle.id === state.activeCycleID) {
                return {
                  ...currentCycle,
                  interruptedDate: new Date()
                }
              } else {
                return currentCycle
              }
            }),
            activeCycleID: null
          }

        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            cycles: state.cycles.map((currentCycle) => {
              if (currentCycle.id === state.activeCycleID) {
                return {
                  ...currentCycle,
                  finishedDate: new Date()
                }
              } else {
                return currentCycle
              }
            }),
            activeCycleID: null
          }

        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleID: null
    }
  )

  const { cycles, activeCycleID } = cyclesState
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)

  const createNewCycle = useCallback(
    ({ task, minutesAmount }: CreateCycleData) => {
      setAmountSecondsPassed(0)

      dispatch({
        type: 'ADD_NEW_CYCLE',
        payload: {
          newCycle: {
            id: uuidv4(),
            task,
            minutesAmount,
            startDate: new Date()
          }
        }
      })
    },
    []
  )

  const interruptCurrentCycle = useCallback(() => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleID
      }
    })
  }, [activeCycleID])

  const markAsFinishedCycle = useCallback(() => {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleID
      }
    })
  }, [activeCycleID])

  const setSecondsPassed = useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds)
  }, [])

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
