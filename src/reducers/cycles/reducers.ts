import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleStateReducer {
  cycles: Cycle[]
  activeCycleID: string | null
}

export function cyclesReducer(state: CycleStateReducer, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleID: action.payload.newCycle.id
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
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

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
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
}
