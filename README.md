# Rubeus QA Challenge - Cypress

Projeto de automação com Cypress para cobrir os principais pontos reportados no teste das páginas:

- `/certificacao`
- `/site`

## Cobertura automatizada

### Certificação
- erro de "base legal" ao enviar formulário com dados válidos
- ausência de limite visível em Nome, Email e Telefone
- botão "Saiba mais" sem navegação
- cards de "Outros Cursos" sem ação
- inconsistência na indicação de campos obrigatórios

### Site
- validação de e-mail somente após envio
- erro de "base legal" após correção do formulário
- inconsistência na obrigatoriedade do Telefone
- campo Nome aceita excesso de caracteres

## Requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Execução

Abrir interface do Cypress:

```bash
npm run cy:open
```

Rodar em modo headless:

```bash
npm run cy:run
```

## Observação

Os seletores foram construídos com base no comportamento visual descrito e nos rótulos visíveis da interface. Caso o HTML use estruturas diferentes para os campos, pode ser necessário um pequeno ajuste nos localizadores.
