import { useForm, FormProvider } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Play, HandPalm } from 'phosphor-react'

import { useCyclesContext } from '../../contexts/CyclesContext'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
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

type NewCycleData = zod.infer<typeof newCycleSchemaValidation>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useCyclesContext()

  const formContext = useForm<NewCycleData>({
    resolver: zodResolver(newCycleSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const { handleSubmit, watch /* reset */ } = formContext
  const isSubmitButtonDisabled = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...formContext}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit"
            disabled={!isSubmitButtonDisabled}
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
