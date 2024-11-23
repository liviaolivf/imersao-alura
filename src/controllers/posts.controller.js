import fs from 'fs';
import {getTodosPosts, criarPost} from "../models/posts.model.js";

export async function listarPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
};

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const posts = await criarPost(novoPost);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  };
};

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    const posts = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${posts.insertedId}.jpg`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  };
};