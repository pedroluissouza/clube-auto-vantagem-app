# Clube Auto Vantagem App

Crie um novo aplicativo web (mobile-first) chamado "Clube Auto Vantagem - App do Associado".

Este é um projeto NOVO e INDEPENDENTE, não relacionado a nenhum outro projeto existente.

CONTEXTO

É o app do cliente final de um clube de vantagens automotivo. O cliente faz login e

acessa sua carteirinha digital, faturas, contrato e benefícios do plano. É consumido

por HTTP a partir de uma API externa (não crie backend, use dados mock por enquanto).

STACK

- React + TypeScript + Vite

- Tailwind CSS

- react-router-dom para navegação

- lucide-react para ícones

- Layout mobile-first, largura máxima ~420px centralizada

DESIGN

- Fundo escuro: #0b0f1a (telas) e #141a29 (cards)

- Cor de destaque: laranja (#f97316 / orange-500), usada em ícones, valores e status ativos

- Texto branco/cinza claro, textos secundários em cinza (#9ca3af)

- Cards com border sutil (white/10), radius grande (rounded-xl / rounded-2xl)

- Sem gradientes ou sombras pesadas, visual limpo e direto

- Fonte padrão do sistema, tamanhos pequenos (12-18px), bem espaçado

ESTRUTURA DE TELAS (com navegação inferior fixa entre elas: Início, Carteirinha,

Financeiro, Benefícios, Perfil)

1. LOGIN (/login)

   - Logo "Clube Auto VANTAGEM"

   - Campos de e-mail/CPF e senha

   - Botão "Acessar minha conta"

   - Link "Esqueceu a senha?" e "Ainda não é membro? Cadastre-se"

2. HOME (/)

   - Saudação com nome do usuário e ícone de notificação

   - Card resumo da carteirinha: nome, código do associado, status (Ativo/Inadimplente),

     veículo, placa, plano e vencimento

   - Grid de acesso rápido 2x2: Fatura, Contrato, Benefícios, Parceiros

   - Card "Próximo vencimento" com botão "Pagar"

3. CARTEIRINHA (/carteirinha)

   - Card completo: nome, código, CPF, veículo, placa, plano, status, QR code

   - Botões "Compartilhar" e "Baixar PDF"

4. FINANCEIRO (/financeiro)

   - Card de destaque com valor da próxima cobrança e botão "Pagar agora"

   - Lista de histórico de pagamentos (mês, data de pagamento, valor, status)

5. CONTRATO (/contrato)

   - Card com nome do contrato, data de assinatura, status "Vigente"

   - Botões "Visualizar contrato" e "Baixar PDF"

   - Tabela com dados do plano (plano, valor mensal, início, vencimento)

6. BENEFÍCIOS (/beneficios)

   - Lista de benefícios do plano (ex: lavagem inclusa, desconto em oficinas,

     guincho 24h) com ícone, título e descrição curta

   - Grid de parceiros próximos (nome + ícone de loja)

7. PERFIL (/perfil)

   - Cabeçalho com avatar (iniciais), nome e data de associado

   - Lista de opções: Meus dados, Meu veículo, Notificações, Suporte/WhatsApp, Sair

DADOS

Use dados mock nas telas por enquanto (nome, CPF, plano, faturas, etc). Deixe um

arquivo separado em src/lib/api.ts já preparado para eu trocar por chamadas reais

de API depois (funções: login, minhaCarteirinha, minhasFaturas, meuContrato,

meusBeneficios), usando fetch com Bearer token salvo no localStorage e uma

variável de ambiente VITE_API_URL como base da URL.

Não crie autenticação real nem backend agora — apenas a interface e a estrutura

de chamadas prontas para eu conectar depois.Crie um novo aplicativo web (mobile-first) chamado "Clube Auto Vantagem - App do Associado".

Este é um projeto NOVO e INDEPENDENTE, não relacionado a nenhum outro projeto existente.

CONTEXTO

É o app do cliente final de um clube de vantagens automotivo. O cliente faz login e

acessa sua carteirinha digital, faturas, contrato e benefícios do plano. É consumido

por HTTP a partir de uma API externa (não crie backend, use dados mock por enquanto).

STACK

- React + TypeScript + Vite

- Tailwind CSS

- react-router-dom para navegação

- lucide-react para ícones

- Layout mobile-first, largura máxima ~420px centralizada

DESIGN

- Fundo escuro: #0b0f1a (telas) e #141a29 (cards)

- Cor de destaque: laranja (#f97316 / orange-500), usada em ícones, valores e status ativos

- Texto branco/cinza claro, textos secundários em cinza (#9ca3af)

- Cards com border sutil (white/10), radius grande (rounded-xl / rounded-2xl)

- Sem gradientes ou sombras pesadas, visual limpo e direto

- Fonte padrão do sistema, tamanhos pequenos (12-18px), bem espaçado

ESTRUTURA DE TELAS (com navegação inferior fixa entre elas: Início, Carteirinha,

Financeiro, Benefícios, Perfil)

1. LOGIN (/login)

   - Logo "Clube Auto VANTAGEM"

   - Campos de e-mail/CPF e senha

   - Botão "Acessar minha conta"

   - Link "Esqueceu a senha?" e "Ainda não é membro? Cadastre-se"

2. HOME (/)

   - Saudação com nome do usuário e ícone de notificação

   - Card resumo da carteirinha: nome, código do associado, status (Ativo/Inadimplente),

     veículo, placa, plano e vencimento

   - Grid de acesso rápido 2x2: Fatura, Contrato, Benefícios, Parceiros

   - Card "Próximo vencimento" com botão "Pagar"

3. CARTEIRINHA (/carteirinha)

   - Card completo: nome, código, CPF, veículo, placa, plano, status, QR code

   - Botões "Compartilhar" e "Baixar PDF"

4. FINANCEIRO (/financeiro)

   - Card de destaque com valor da próxima cobrança e botão "Pagar agora"

   - Lista de histórico de pagamentos (mês, data de pagamento, valor, status)

5. CONTRATO (/contrato)

   - Card com nome do contrato, data de assinatura, status "Vigente"

   - Botões "Visualizar contrato" e "Baixar PDF"

   - Tabela com dados do plano (plano, valor mensal, início, vencimento)

6. BENEFÍCIOS (/beneficios)

   - Lista de benefícios do plano (ex: lavagem inclusa, desconto em oficinas,

     guincho 24h) com ícone, título e descrição curta

   - Grid de parceiros próximos (nome + ícone de loja)

7. PERFIL (/perfil)

   - Cabeçalho com avatar (iniciais), nome e data de associado

   - Lista de opções: Meus dados, Meu veículo, Notificações, Suporte/WhatsApp, Sair

DADOS

Use dados mock nas telas por enquanto (nome, CPF, plano, faturas, etc). Deixe um

arquivo separado em src/lib/api.ts já preparado para eu trocar por chamadas reais

de API depois (funções: login, minhaCarteirinha, minhasFaturas, meuContrato,

meusBeneficios), usando fetch com Bearer token salvo no localStorage e uma

variável de ambiente VITE_API_URL como base da URL.

Não crie autenticação real nem backend agora — apenas a interface e a estrutura

de chamadas prontas para eu conectar depois.Crie um novo aplicativo web (mobile-first) chamado "Clube Auto Vantagem - App do Associado".

Este é um projeto NOVO e INDEPENDENTE, não relacionado a nenhum outro projeto existente.

CONTEXTO

É o app do cliente final de um clube de vantagens automotivo. O cliente faz login e

acessa sua carteirinha digital, faturas, contrato e benefícios do plano. É consumido

por HTTP a partir de uma API externa (não crie backend, use dados mock por enquanto).

STACK

- React + TypeScript + Vite

- Tailwind CSS

- react-router-dom para navegação

- lucide-react para ícones

- Layout mobile-first, largura máxima ~420px centralizada

DESIGN

- Fundo escuro: #0b0f1a (telas) e #141a29 (cards)

- Cor de destaque: laranja (#f97316 / orange-500), usada em ícones, valores e status ativos

- Texto branco/cinza claro, textos secundários em cinza (#9ca3af)

- Cards com border sutil (white/10), radius grande (rounded-xl / rounded-2xl)

- Sem gradientes ou sombras pesadas, visual limpo e direto

- Fonte padrão do sistema, tamanhos pequenos (12-18px), bem espaçado

ESTRUTURA DE TELAS (com navegação inferior fixa entre elas: Início, Carteirinha,

Financeiro, Benefícios, Perfil)

1. LOGIN (/login)

   - Logo "Clube Auto VANTAGEM"

   - Campos de e-mail/CPF e senha

   - Botão "Acessar minha conta"

   - Link "Esqueceu a senha?" e "Ainda não é membro? Cadastre-se"

2. HOME (/)

   - Saudação com nome do usuário e ícone de notificação

   - Card resumo da carteirinha: nome, código do associado, status (Ativo/Inadimplente),

     veículo, placa, plano e vencimento

   - Grid de acesso rápido 2x2: Fatura, Contrato, Benefícios, Parceiros

   - Card "Próximo vencimento" com botão "Pagar"

3. CARTEIRINHA (/carteirinha)

   - Card completo: nome, código, CPF, veículo, placa, plano, status, QR code

   - Botões "Compartilhar" e "Baixar PDF"

4. FINANCEIRO (/financeiro)

   - Card de destaque com valor da próxima cobrança e botão "Pagar agora"

   - Lista de histórico de pagamentos (mês, data de pagamento, valor, status)

5. CONTRATO (/contrato)

   - Card com nome do contrato, data de assinatura, status "Vigente"

   - Botões "Visualizar contrato" e "Baixar PDF"

   - Tabela com dados do plano (plano, valor mensal, início, vencimento)

6. BENEFÍCIOS (/beneficios)

   - Lista de benefícios do plano (ex: lavagem inclusa, desconto em oficinas,

     guincho 24h) com ícone, título e descrição curta

   - Grid de parceiros próximos (nome + ícone de loja)

7. PERFIL (/perfil)

   - Cabeçalho com avatar (iniciais), nome e data de associado

   - Lista de opções: Meus dados, Meu veículo, Notificações, Suporte/WhatsApp, Sair

DADOS

Use dados mock nas telas por enquanto (nome, CPF, plano, faturas, etc). Deixe um

arquivo separado em src/lib/api.ts já preparado para eu trocar por chamadas reais

de API depois (funções: login, minhaCarteirinha, minhasFaturas, meuContrato,

meusBeneficios), usando fetch com Bearer token salvo no localStorage e uma

variável de ambiente VITE_API_URL como base da URL.

Não crie autenticação real nem backend agora — apenas a interface e a estrutura

de chamadas prontas para eu conectar depois.Crie um novo aplicativo web (mobile-first) chamado "Clube Auto Vantagem - App do Associado".

Este é um projeto NOVO e INDEPENDENTE, não relacionado a nenhum outro projeto existente.

CONTEXTO

É o app do cliente final de um clube de vantagens automotivo. O cliente faz login e

acessa sua carteirinha digital, faturas, contrato e benefícios do plano. É consumido

por HTTP a partir de uma API externa (não crie backend, use dados mock por enquanto).

STACK

- React + TypeScript + Vite

- Tailwind CSS

- react-router-dom para navegação

- lucide-react para ícones

- Layout mobile-first, largura máxima ~420px centralizada

DESIGN

- Fundo escuro: #0b0f1a (telas) e #141a29 (cards)

- Cor de destaque: laranja (#f97316 / orange-500), usada em ícones, valores e status ativos

- Texto branco/cinza claro, textos secundários em cinza (#9ca3af)

- Cards com border sutil (white/10), radius grande (rounded-xl / rounded-2xl)

- Sem gradientes ou sombras pesadas, visual limpo e direto

- Fonte padrão do sistema, tamanhos pequenos (12-18px), bem espaçado

ESTRUTURA DE TELAS (com navegação inferior fixa entre elas: Início, Carteirinha,

Financeiro, Benefícios, Perfil)

1. LOGIN (/login)

   - Logo "Clube Auto VANTAGEM"

   - Campos de e-mail/CPF e senha

   - Botão "Acessar minha conta"

   - Link "Esqueceu a senha?" e "Ainda não é membro? Cadastre-se"

2. HOME (/)

   - Saudação com nome do usuário e ícone de notificação

   - Card resumo da carteirinha: nome, código do associado, status (Ativo/Inadimplente),

     veículo, placa, plano e vencimento

   - Grid de acesso rápido 2x2: Fatura, Contrato, Benefícios, Parceiros

   - Card "Próximo vencimento" com botão "Pagar"

3. CARTEIRINHA (/carteirinha)

   - Card completo: nome, código, CPF, veículo, placa, plano, status, QR code

   - Botões "Compartilhar" e "Baixar PDF"

4. FINANCEIRO (/financeiro)

   - Card de destaque com valor da próxima cobrança e botão "Pagar agora"

   - Lista de histórico de pagamentos (mês, data de pagamento, valor, status)

5. CONTRATO (/contrato)

   - Card com nome do contrato, data de assinatura, status "Vigente"

   - Botões "Visualizar contrato" e "Baixar PDF"

   - Tabela com dados do plano (plano, valor mensal, início, vencimento)

6. BENEFÍCIOS (/beneficios)

   - Lista de benefícios do plano (ex: lavagem inclusa, desconto em oficinas,

     guincho 24h) com ícone, título e descrição curta

   - Grid de parceiros próximos (nome + ícone de loja)

7. PERFIL (/perfil)

   - Cabeçalho com avatar (iniciais), nome e data de associado

   - Lista de opções: Meus dados, Meu veículo, Notificações, Suporte/WhatsApp, Sair

DADOS

Use dados mock nas telas por enquanto (nome, CPF, plano, faturas, etc). Deixe um

arquivo separado em src/lib/api.ts já preparado para eu trocar por chamadas reais

de API depois (funções: login, minhaCarteirinha, minhasFaturas, meuContrato,

meusBeneficios), usando fetch com Bearer token salvo no localStorage e uma

variável de ambiente VITE_API_URL como base da URL.

Não crie autenticação real nem backend agora — apenas a interface e a estrutura

de chamadas prontas para eu conectar depois.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c753a1ac-e6d7-4bfd-a680-9de93120fdee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
