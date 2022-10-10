import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  FormContainer,
  TaskInput,
  MinutesAmountInput,
  CountdownContainer,
  Separator,
  StartCountdownButton
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

const newCycleSchemaValidation = zod.object({
  task: zod
    .string()
    .min(1, 'Informe a tarefa')
    .max(256, '256 é máximo de caracteres'),
  minutesAmount: zod
    .number()
    .min(5, '5 é o valor mínimo')
    .max(60, '60 é o valor máximo')
})

type NewCycleFormData = zod.infer<typeof newCycleSchemaValidation>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
  const [secondsGone, setSecondsGone] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const isSubmitButtonDisabled = watch('task')
  const activeCycle = cycles.find(
    (currentCycle) => currentCycle.id === activeCycleID
  )
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsGone : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const padMinutes = String(minutesAmount).padStart(2, '0')
  const padSeconds = String(secondsAmount).padStart(2, '0')

  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
    const id = uuidv4()
    const newCycle: Cycle = { id, task, minutesAmount, startDate: new Date() }

    setCycles((currentState) => [...currentState, newCycle])
    setActiveCycleID(id)

    reset()
  }

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        setSecondsGone(difference)
      }, 1000)
    }
  }, [activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para sua tarefa"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto do chevrolet cruze 2025" />
            <option value="Votar no bolsonaro 2022" />
            <option value="Assistir vídeos da finclass" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{padMinutes[0]}</span>
          <span>{padMinutes[1]}</span>
          <Separator>:</Separator>
          <span>{padSeconds[0]}</span>
          <span>{padSeconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={!isSubmitButtonDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
