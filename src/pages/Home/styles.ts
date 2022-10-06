import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme['gray-100']};
  border-radius: 4px;
  transition: all 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  width: 4rem;
  overflow: hidden;
  color: ${({ theme }) => theme['green-500']};
`

export const StartCountdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  border: none;
  font-weight: bold;
  background-color: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};
  transition: all 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }
`
