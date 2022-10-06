import { HistoryContainer, HistoryList, TaskStatus } from './styles'

export function History() {
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
            <tr>
              <td>Projeto cruze 2025</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <TaskStatus statusColor="yellow">Pendente</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Venda da souza cruz</td>
              <td>15 minutos</td>
              <td>Há cerca de 3 meses</td>
              <td>
                <TaskStatus statusColor="red">Cancelado</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Aquisição da BAT tabacos</td>
              <td>55 minutos</td>
              <td>Há cerca de 1 meses</td>
              <td>
                <TaskStatus statusColor="green">Concluído</TaskStatus>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
