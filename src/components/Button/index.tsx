import { Container, ButtonVariant } from './styles'

interface Props {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: Props) {
  return <Container variant={variant}>Enviar</Container>
}
