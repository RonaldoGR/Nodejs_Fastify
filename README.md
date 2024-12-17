# Nodejs_Fastify

## Descrição
Este código implementa uma API RESTful utilizando o Fastify e segue os padrões CRUD para gerenciamento de dados relacionados a vídeos fictícios.

## Links Rocketseat
Projeto feito do canal da Rocketseat no YouTube: https://www.youtube.com/watch?v=hHM-hr9q4mo 
Plataforma da Rocketseat: https://www.rocketseat.com.br/

## Link Fastify
Link da documentação Fastify: https://fastify.dev/ 


## Principais Características
### Framework Utilizado:
Fastify é utilizado para a criação e gerenciamento das rotas HTTP do servidor.
### Padrão CRUD:

**Create**:
* Endpoint POST /videos para criação de novos vídeos.

**Read**:
* Endpoint GET /videos para listar vídeos com suporte a filtros.

**Update**:
* Endpoint PUT /videos/:id para atualizar informações de um vídeo específico.

**Delete**:
* Endpoint DELETE /videos/:id para remover um vídeo específico.

### Rotas Disponíveis:

* GET /: Teste inicial da API.
* GET /teste1 e GET /teste2: Testes adicionais de resposta.
* POST /videos: Cria um novo vídeo com dados enviados no corpo da requisição.
* GET /videos: Retorna a lista de vídeos com suporte a busca por parâmetros (query string).
* PUT /videos/:id: Atualiza um vídeo específico com base no ID fornecido nos parâmetros.
* DELETE /videos/:id: Exclui um vídeo específico com base no ID fornecido.
* Banco de Dados:

A API utiliza um módulo separado (database-postgres.js) para gerenciar a persistência dos dados, presumidamente em um banco de dados PostgreSQL.
### Respostas HTTP Padrão:

* 201 Created → Para criação de um recurso.
* 204 No Content → Para atualizações ou exclusões bem-sucedidas.
* 404 Not Found → Quando o recurso solicitado não é encontrado.

### Porta do Servidor:
O servidor escuta na porta padrão 3000 ou em outra definida pela variável de ambiente PORT.

## Agradecimentos
Gostaria de agradecer ao Diego e a equipe da Rocketseat por disponibilizar conteúdos de excelente qualidade de forma gratuita no seu canal do YouTube.