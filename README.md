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