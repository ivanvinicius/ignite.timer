import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Button } from './components/Button'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="secondary" />
      <Button />
      <GlobalStyle />
    </ThemeProvider>
  )
}
