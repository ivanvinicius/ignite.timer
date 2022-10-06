import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary'

interface ContainerProps {
  variant: ButtonVariant
}

export const Container = styled.button<ContainerProps>`
  width: 100px;
  height: 40px;
  color: ${({ theme }) => theme.white};
`
