// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//   console.log("Servidor iniciado");
//   response.write("TESTE 78");

//   return response.end();
// });

// server.listen(3000);
// importando um servidor HTTP nativo do None

//Importando com fastify

import { fastify } from 'fastify';
import { databaseMemory } from './databaseMemory.js';
import { request } from 'http';

// criando o servidor fastify
const server = fastify();
// atribuindo a uma variável uma classe com seus métodos databaseMemory
const database = new databaseMemory();



server.get('/', () => {
  return "TESTE FASTIFY";
  
});

server.get('/teste1', () => {
  return "TESTE FASTIFY_1";

});

server.get('/teste2', () => {
  return "TESTE FASTIFY_2";

});

// Criação de rotas do CRUD

server.post('/videos', (request, reply) => {

  // desestruturação para pegar os valores do corpo da requisição
  const { title, description, duration } = request.body;

  database.create({
    title: title,
    description: description,
    duration: duration,
  });

  // método criado na classe para listar os dados
  console.log(database.list());


  return reply.status(201).send();
});

server.get('/videos', () => {
  
  let videos = database.list();
  console.log("VIDEOS: ", videos);
  return videos;
});

server.put('/videos/:id', (request, reply) => {

  const videoId = request.params.id;
  const { title, description, duration } = request.body;
 

  try {
    database.update(videoId, { title, description, duration });
    return reply.status(204).send();
  } catch (error) {
    console.error(error.message);
    return reply.status(404).send({ error: error.message });
  }

});

server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id 

  try {
    database.delete(videoId);
    return reply.status(204).send();
  } catch(error) {
    console.error("ERROR: ", error.message);
    return reply.status(404).send({ error: error.message });
  }
  

});




server.listen({
    port: 3000
});



