import { randomUUID } from "node:crypto";

export class databaseMemory {
  #videos = new Map();

  list() {
    // Método que reestrutura os dados para retornar um array  .values - valor .entries - 
   return Array.from(this.#videos.entries()).map((videoArray) => {
      const id = videoArray[0];
      const data = videoArray[1];
    

      return {
        id,
        ...data,
      }
   });
  };

  create(video) {
    // função que cria um ID único
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
    console.log(`Created video with id ${videoId}:`, video);
  };

  update(id, video) {
    if (!this.#videos.has(id)) {
      throw new Error(`Video with id ${id} not found`);
    }
    this.#videos.set(id, video);
  }

  delete (id) {
    this.#videos.delete(id);
  };

};

