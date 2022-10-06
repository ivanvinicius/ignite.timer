import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  FormContainer,
  TaskInput,
  MinutesAmountInput,
  CountdownContainer,
  Separator,
  StartCountdownButton
} from './styles'

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
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const isSubmitButtonDisabled = watch('task')

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={!isSubmitButtonDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
