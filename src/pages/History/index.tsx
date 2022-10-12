import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useCyclesContext } from '../../contexts/CyclesContext'

import { HistoryContainer, HistoryList, TaskStatus } from './styles'

export function History() {
  const { cycles } = useCyclesContext()

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(
              ({
                id,
                task,
                minutesAmount,
                startDate,
                finishedDate,
                interruptedDate
              }) => (
                <tr key={id}>
                  <td>{task}</td>
                  <td>{minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(startDate), {
                      locale: ptBR,
                      addSuffix: true
                    })}
                  </td>
                  <td>
                    {finishedDate && (
                      <TaskStatus statusColor="green">Concluído</TaskStatus>
                    )}
                    {interruptedDate && (
                      <TaskStatus statusColor="red">Interrompido</TaskStatus>
                    )}
                    {!finishedDate && !interruptedDate && (
                      <TaskStatus statusColor="yellow">Em andamento</TaskStatus>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
