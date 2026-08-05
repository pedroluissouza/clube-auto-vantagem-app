# Regras Gerais de Integração com o Backend

- **Autenticação:** Todo endpoint (exceto login) exige cabeçalho `Authorization: Bearer {token}`. Se o token for inválido/expirado, o comportamento esperado é retornar HTTP 401.
- **Datas:** Devem ser sempre trafegadas no formato `YYYY-MM-DD` (ISO), nunca `DD/MM/YYYY`. A formatação para exibição (`DD/MM/YYYY`) deve ser feita exclusivamente no frontend.
- **Valores Monetários:** Devem ser sempre trafegados como tipo `number` (ex: `150.50`), nunca como string contendo "R$". A formatação da moeda fica por conta do frontend.
- **Tratamento de Erros:** Os erros sempre virão no formato `{ "erro": "mensagem" }` com o HTTP status correspondente (400, 401, 404, 500).
