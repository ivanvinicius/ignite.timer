## Conhecimentos adquiridos nas aulas

### Eslint da Rocketseat

OBS: Caso o prettier estaja configurado no VSCode é necessário criar o arquivo
`prettier.config.cjs`:
```js
module.exports = {
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'none',
  endOfLine: 'auto',
}
```

OBS: Para corrigir código ao salvar, nas configurações do VScode habilitar:
```js
 "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
```

1 - Instalar pacote ```cmd yarn add eslint @rocketseat/eslint-config -D```

2 - Criar arquivo `.eslintrc.json` e extender configurações do pacote:
```js
{
  "extends": "@rocketseat/eslint-config/react"
}
```

3 - Comando que procura erros, para fazer o lint automático basta adicionar `--fix`
```cmd
yarn eslint src --ext .ts,.tsx
```

### Utilizando Layouts do React Router DOM

Essa funcionalidade permite a criação de layout para nossa aplicação. Por exemplo,
imagine que temos um <Header /> que é exibido em diversas páginas do nosso App,
cada vez que uma página é carregada o <Header /> é carregado novamente. Utilizando
os Layouts evitamos isso. Vamos conferir o código abaixo:

<strong>
O componente Outled diz respeito ao local onde o resto da aplicação vai ser inserido, 
como se fosse o children...
</strong>

```js
// criando layout
import { Outlet } from 'react-router-dom'

import { Header } from '../components/Header'

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
```

```js
// configurando as rotas para usar o layout
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { History } from './pages/History'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### Reaproveitando estilização de componentes no styled-components

```js
const BaseInput = styled.input``

export const TaskInput = styled(BaseInput)``
```

### Tipando elemento através da chave de outro elemento

```js
const STATUS_COLOR = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500'
} as const //Indicando que os valores não são uma simples string

interface TaskStatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const TaskStatus = styled.span<TaskStatusProps>`
  background: ${({ theme, statusColor }) => theme[STATUS_COLOR[statusColor]]};
`
```

### Inferência de tipos de um formulário através do ZOD

```js
const newCycleSchemaValidation = zod.object({
  task: zod.string().min(1)    
})

type NewCycleFormData = zod.infer<typeof newCycleSchemaValidation>

const { handleSubmit } = useForm<NewCycleFormData>({
  resolver: zodResolver(newCycleSchemaValidation),
  defaultValues: {
    task: '',
    minutesAmount: 0
  }
})

function handleCreateNewCycle(data: NewCycleFormData) {
  console.log(data)
}
```