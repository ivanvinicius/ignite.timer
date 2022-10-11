import { useFormContext } from 'react-hook-form'

import { useCyclesContext } from '../../../../contexts/CyclesContext'

import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

export function NewCycleForm() {
  const { register } = useFormContext()
  const { activeCycle } = useCyclesContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para sua tarefa"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
