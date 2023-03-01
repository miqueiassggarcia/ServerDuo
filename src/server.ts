import express from "express";
import CryptoJS from "crypto-js";

import { PrismaClient } from "@prisma/client";

import { userSchema, userLoginSchema } from "./validation/User";
import { gameSchema } from "./validation/Game";
import { postSchema } from "./validation/Post";

const app = express();
app.use(express.json());

const prisma = new PrismaClient({
  log: ["query"]
});

// Rota para cadastro de novo usuário
app.post("/singin", async (request, response) => {
  const {name, email, photoLink, password} = userSchema.parse(request.body);

  const words = CryptoJS.SHA256(password);
  const hash = words.toString();

  const user = await prisma.user.create({
    data: {
      name: name,
      photoLink: photoLink,
      email: email,
      hash: hash
    }
  });

  return response.status(201).json(user);
});

// Rota para pegar usuário por id
app.get("/user/:id", async (request, response) => {
  const userId = request.params.id;

  const user = await prisma.user.findUniqueOrThrow({
    select: {
      name: true,
      photoLink: true,
      email: true,
      hash: true,
    },
    where: {
      idUser: userId,
    }
  });

  return response.json(user);
});

// Rota para validar usuário
app.post("/singup", async (request, response) => {
  const { email, password } = userLoginSchema.parse(request.body);

  const user = await prisma.user.findUniqueOrThrow({
    select: {
      idUser: true,
      hash: true,
    },
    where: {
      email: email
    }
  });

  if(user.hash === CryptoJS.SHA256(password).toString()) {
    return response.json({
      "validate": true,
      "idUser": user.idUser
    })
  } else {
    return response.json({
      "validate": false 
    })
  }
});

// Rota para cadastrar novo jogo
app.post("/game", async (request, response) => {
  const { name, photoLink } = gameSchema.parse(request.body);

  const game = await prisma.game.create({
    data: {
      name: name,
      photoLink: photoLink
    }
  });

  return response.status(201).json(game)
});

// Rota para listar todos os jogos disponíveis
app.get("/games", async (request, response) =>   {
  const games = await prisma.game.findMany();

  response.json(games);
});

// Rota para criar um novo post
app.post("/post", async (request, response) => {
  const {
    gameIdGame,
    userIdUser,
    title,
    description,
    discord,
    yearPlaying,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel
  } = postSchema.parse(request.body);

  const post = await prisma.post.create({
    data: {
      userIdUser: userIdUser,
      gameIdGame: gameIdGame,
      title: title,
      description: description,
      discord: discord,
      yearPlaying: yearPlaying,
      weekDays: weekDays,
      hourStart: hourStart,
      hourEnd: hourEnd,
      useVoiceChannel: useVoiceChannel
    }
  });

  return response.status(201).json(post);
});

// Rota para listar todos os posts
app.get("/posts", async (request, response) => {
  const posts = await prisma.post.findMany();

  response.json(posts);
});

// Rota para listar todos os posts por id
app.get("/posts/user/:id", async (request, response) => {
  const idUser = request.params.id;

  const posts = await prisma.post.findMany({
    where: {
      userIdUser: idUser
    }
  });

  response.json(posts);
});

// Rota para listar todos os jogo
app.get("/posts/game/:id", async (request, response) => {
  const idGame = request.params.id;

  const posts = await prisma.post.findMany({
    where: {
      gameIdGame: idGame
    }
  });

  response.json(posts);
});

app.listen("3333");