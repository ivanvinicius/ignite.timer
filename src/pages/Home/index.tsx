import { Play } from 'phosphor-react'

import {
  HomeContainer,
  FormContainer,
  TaskInput,
  MinutesAmountInput,
  CountdownContainer,
  Separator,
  StartCountdownButton
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para sua tarefa"
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

        <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
