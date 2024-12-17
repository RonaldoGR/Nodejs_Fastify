// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//   console.log("Servidor iniciado");
//   response.write("TESTE 78");

//   return response.end();
// });

// server.listen(3000);
// importando um servidor HTTP nativo do None

//Importando com fastify

import { fastify } from 'fastify'; // Importa a biblioteca Fastify para criar o servidor
import { databaseMemory } from './databaseMemory.js'; // Importa o módulo de banco de dados em memória (possivelmente não utilizado)
import { request } from 'http'; // Importa o módulo de requisição HTTP (possivelmente não utilizado neste contexto)
import { databasePostgres } from './database-postgres.js'; // Importa o módulo de conexão com o PostgreSQL

// Cria uma instância do servidor Fastify
const server = fastify();

// Cria uma instância da classe de banco de dados PostgreSQL
const database = new databasePostgres(); 

// Define uma rota GET para a raiz ('/'), retornando uma mensagem de teste
server.get('/', () => { 
  return "TESTE FASTIFY"; 
}); 

// Define uma rota GET para '/teste1', retornando uma mensagem de teste
server.get('/teste1', () => { 
  return "TESTE FASTIFY_1";
}); 

// Define uma rota GET para '/teste2', retornando uma mensagem de teste
server.get('/teste2', () => { 
  return "TESTE FASTIFY_2";
}); 

// Criação de rotas do CRUD (Create, Read, Update, Delete) para vídeos

// Rota POST para criar um novo vídeo
server.post('/videos', async (request, reply) => { 
  // Extrai os dados do corpo da requisição (título, descrição e duração)
  const { title, description, duration } = request.body; 

  // Chama a função create do banco de dados para inserir um novo vídeo
  await database.create({ 
    title: title, 
    description: description, 
    duration: duration, 
  });

  // Retorna uma resposta HTTP 201 (Criado)
  return reply.status(201).send(); 
}); 

// Rota GET para listar vídeos
server.get('/videos', async (request) => { 
  const search = request.query.search; // Obtém o parâmetro de busca da query string

  // Chama a função list do banco de dados para buscar os vídeos
  let videos = await database.list(search); 
  console.log("VIDEOS: ", videos); // Loga os vídeos no console (para depuração)
  return videos; // Retorna os vídeos como resposta
});

server.put('/videos/:id', (request, reply) => { // Define uma rota PUT para atualizar um vídeo específico

  const videoId = request.params.id; // Obtém o ID do vídeo a ser atualizado a partir dos parâmetros da requisição
  const { title, description, duration } = request.body; // Extrai os novos dados do vídeo do corpo da requisição

  try { // Tenta executar a atualização
    database.update(videoId, { title, description, duration }); // Chama a função de atualização do banco de dados
    return reply.status(204).send(); // Retorna uma resposta 204 (Sem Conteúdo) indicando que a atualização foi bem-sucedida
  } catch (error) { // Captura qualquer erro que possa ocorrer durante a atualização
    console.error(error.message); // Imprime a mensagem de erro no console para depuração
    return reply.status(404).send({ error: error.message }); // Retorna uma resposta 404 (Não Encontrado) com a mensagem de erro, indicando que o vídeo não foi encontrado ou ocorreu outro problema
  }
});

server.delete('/videos/:id', (request, reply) => { // Define uma rota DELETE para excluir um vídeo específico

  const videoId = request.params.id; // Obtém o ID do vídeo a ser excluído a partir dos parâmetros da requisição

  try { // Tenta executar a exclusão
    database.delete(videoId); // Chama a função de exclusão do banco de dados
    return reply.status(204).send(); // Retorna uma resposta 204 (Sem Conteúdo) indicando que a exclusão foi bem-sucedida
  } catch (error) { // Captura qualquer erro que possa ocorrer durante a exclusão
    console.error("ERROR: ", error.message); // Imprime a mensagem de erro no console para depuração
    return reply.status(404).send({ error: error.message }); // Retorna uma resposta 404 (Não Encontrado) com a mensagem de erro, indicando que o vídeo não foi encontrado ou ocorreu outro problema
  }
});

server.listen({
  port: process.env.PORT ?? 3000,
});


