# Changelog — Minha Carteira

Registro do que foi feito no projeto, da versão mais recente para a mais antiga.

## [V1.2] - 2026-09-23 — Reorganização do projeto

### Alterado
- Projeto reorganizado em pastas por funcionalidade:
  - `frontEnd/loginCadastro` (index.html, script.js, style.css)
  - `frontEnd/dashBoard` (dashboard.html, dashboard.js)
  - `backEnd` (server.js)
  - `FLUXOGRAMA` (fluxograma do projeto)
- `.env`, `package.json` e `node_modules` mantidos na raiz do projeto
- Caminho do `.env` no `server.js` ajustado para a nova pasta (`path.join(__dirname, '..', '.env')`)
- Servidor Express passou a servir a pasta `frontEnd` (`express.static`), sem expor o `.env`
- Caminhos do CSS e dos redirecionamentos entre login e dashboard ajustados à nova estrutura

### Adicionado
- Novo fluxograma com API Gateway (Node.js) e 10 APIs de negócio: Usuários, Contas, Receitas, Despesas, Cartões, Dívidas, Investimentos, Metas, Relatórios e Notificações

### Aprendizados
- Caminhos relativos (`../`) contam a partir da pasta do arquivo; caminhos com `/` no início contam a partir da raiz do endereço em que a página foi aberta
- Código de front-end (que usa `document`, `localStorage`, `supabase` do CDN) roda no navegador, não direto no Node
- Login e dashboard precisam ser abertos na mesma origem (mesmo endereço e porta) para a sessão do Supabase ser encontrada

## [V1.1] — Servidor Node e dashboard com dados reais

### Adicionado
- Servidor Node.js com Express rodando em `localhost:3000`
- Rota `/api/dashboard`, protegida por validação do token do usuário
- 4 tabelas no Supabase (contas, cartões, dívidas, empréstimos) com RLS
- Dashboard exibindo contas, cartões e dívidas reais do usuário logado
- Secret Key do Supabase guardada em `.env` e protegida pelo `.gitignore`

## [V1.0] — Login e cadastro

### Adicionado
- Tela de login e cadastro integrada ao Supabase Auth
- Opção "Lembrar meu e-mail" (localStorage) e limpeza do campo de senha após o login
- Visual escuro com destaque dourado (fontes Fraunces e Inter)
- Projeto versionado no Git e publicado no GitHub

## Pendências conhecidas

- Botão Sair do dashboard: corrigir o caminho de volta para o login (`../loginCadastro/index.html`)
- `index.html` do login: remover o `</form>` duplicado
- `script.js` do login: remover os `console.log` de e-mail e senha e atualizar a mensagem do cadastro
- Remover o arquivo temporário do draw.io (`.bkp`) do repositório e adicioná-lo ao `.gitignore`
- Mostrar empréstimos no dashboard e preencher o saldo total
- Tratar erros no `dashboard.js` (servidor desligado, token expirado)

## Próximos passos

1. Separar o `server.js` em Gateway, middleware de autenticação e uma rota por API
2. Formulários para cadastrar contas, cartões, dívidas e empréstimos
3. Interação entre APIs (ex.: compra no cartão atualiza despesas e saldo)
4. Gráfico de pizza por banco e resumo do saldo total
5. Receitas, despesas, relatórios, metas, investimentos e notificações
6. Casos de teste (portfólio de QA)

## [V1.3] - 2026-09-25 — Servidor modular e limpeza

### Alterado
- server.js separado em Gateway, middleware e rotas modulares:
  - backEnd/supabase.js: conexão única com o Supabase
  - backEnd/middleware/auth.js: validação do token (identificarUsuario)
  - backEnd/routes/dashboard.js: rota /api/dashboard
  - server.js: agora só liga o servidor e conecta as partes (Gateway)
- Acessar http://localhost:3000 sozinho redireciona automaticamente para a tela de login
- Mensagem de erro de login padronizada para "E-mail ou senha incorretos."

### Corrigido
- Botão Sair do dashboard: caminho de volta para o login corrigido
- index.html do login: removido `</form>` duplicado
- script.js do login: removidos os console.log com e-mail e senha digitados
- Alerta de cadastro atualizado (não menciona mais confirmação por e-mail, que está desativada)

### Adicionado
- Fluxograma v2 (arquivo .drawio) refeito a partir do desenho atualizado, com API Gateway, 10 APIs de negócio e 14 blocos de desenvolvimento

### Aprendizados
- O projeto deve sempre ser aberto por http://localhost:3000 (nunca direto pelo arquivo no disco), porque os caminhos com "/" no início dependem do servidor
- Diferença de maiúsculas/minúsculas em nomes de arquivo (ex.: supaBase.js vs supabase.js) funciona no Windows mas quebra em servidores Linux
