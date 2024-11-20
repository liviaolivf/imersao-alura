import conectarAoBanco from "../config/db.config.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getTodosPosts() {
  const db = conexao.db("imersao-alura");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}