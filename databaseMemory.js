import { randomUUID } from "node:crypto"; // Importa a função para gerar IDs únicos aleatórios

export class databaseMemory {
  #videos = new Map(); // Cria um Map para armazenar os vídeos em memória, usando um ID como chave

  list(search) { // Método para listar os vídeos, com opção de filtragem por título
    // Transforma o Map em um array de arrays, onde cada elemento interno é um [id, dados do vídeo]
    // Mapea cada elemento do array para um objeto com as propriedades id e os dados do vídeo
    // Filtra os vídeos com base no termo de busca (se houver)
    return Array.from(this.#videos.entries())
      .map(([id, data]) => ({ id, ...data }))
      .filter(video => search ? video.title.includes(search) : true);
  };

  create(video) { // Método para criar um novo vídeo
    const videoId = randomUUID(); // Gera um ID único para o novo vídeo
    this.#videos.set(videoId, video); // Adiciona o vídeo ao Map, usando o ID como chave
    console.log(`Created video with id ${videoId}:`, video); // Loga uma mensagem no console para confirmar a criação
  };

  update(id, video) { // Método para atualizar um vídeo existente
    if (!this.#videos.has(id)) { // Verifica se o vídeo existe
      throw new Error(`Video with id ${id} not found`); // Lança um erro se o vídeo não for encontrado
    }
    this.#videos.set(id, video); // Atualiza os dados do vídeo no Map
  }

  delete(id) { // Método para excluir um vídeo
    this.#videos.delete(id); // Remove o vídeo do Map
  };
};