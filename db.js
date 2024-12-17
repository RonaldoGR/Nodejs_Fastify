import 'dotenv/config'; // Carrega as variáveis de ambiente a partir do arquivo .env
import { neon } from "@neondatabase/serverless"; // Importa a biblioteca Neon para interagir com o banco de dados

export const sql = neon(process.env.DATABASE_URL); // Cria uma conexão com o banco de dados Neon usando a URL obtida das variáveis de ambiente
