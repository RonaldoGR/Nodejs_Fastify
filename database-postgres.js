import { randomUUID } from "node:crypto"; // Importa a função para gerar UUIDs aleatórios
import { sql } from "./db.js"; // Importa a conexão com o banco de dados PostgreSQL

export class databasePostgres {

  async list(search) { // Método para listar vídeos
    let videos;

    if (search) { // Se houver um termo de busca
      videos = await sql`select * FROM videos WHERE title ilike ${'%' + search + '%'}`; // Busca vídeos com título semelhante ao termo de busca
    } else {
      videos = await sql`select * FROM videos`; // Busca todos os vídeos
    }

    return videos; // Retorna os vídeos encontrados
  };

  async create(video) { // Método para criar um novo vídeo
    const videoId = randomUUID(); // Gera um ID único para o vídeo
    const { title, description, duration } = video; // Extrai os dados do vídeo

    await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`; // Insere o vídeo no banco de dados
  }

  async update(id, video) { // Método para atualizar um vídeo
    const { title, description, duration } = video; // Extrai os dados do vídeo

    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`; // Atualiza o vídeo no banco de dados
  }

  async delete(id) { // Método para excluir um vídeo
    await sql`DELETE FROM videos WHERE id = ${id}`; // Exclui o vídeo do banco de dados
  }
};
