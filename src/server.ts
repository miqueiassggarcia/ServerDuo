import express from "express";
import CryptoJS from "crypto-js";

import { PrismaClient } from "@prisma/client";

import { userSchema, userLoginSchema } from "./validation/User";
import { gameSchema } from "./validation/Game";
import { postSchema } from "./validation/Post";
import { notificationSchema } from "./validation/Notification";

const app = express();
app.use(express.json());

const prisma = new PrismaClient({
  log: ["query"]
});

// Rota para cadastro de novo usuário
app.post("/singup", async (request, response) => {
  const {name, email, photoLink, password} = userSchema.parse(request.body);

  let exists = false;
  try {
    const userExists = await prisma.user.findUniqueOrThrow({
      where: {
        email: email
      }
    });

    if (userExists) {
      console.log(true)
      exists = true;
    }
  } catch(err) {
    console.log(err);
  }

  if (!exists) { 
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
  } else {
    return response.json({"message": "usuário já existe"})
  }
});

// Rota para pegar usuário por id
app.get("/user/:id", async (request, response) => {
  const userId = request.params.id;

  try {
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
  } catch (err) {
    console.log(err);
    return response.json({"message": "usuário não existe"})
  }
});

// Rota para validar usuário
app.post("/singin", async (request, response) => {
  const { email, password } = userLoginSchema.parse(request.body);

  let exists: boolean;
  let user;
  try {
    user = await prisma.user.findUniqueOrThrow({
      select: {
        idUser: true,
        hash: true,
      },
      where: {
        email: email
      }
    });

    if(user) {
      exists = true;
    } else {
      exists = false;
    }
  } catch (err) {
    console.log(err);
    exists = false;
  }

  if (exists) {
    if(user?.hash === CryptoJS.SHA256(password).toString()) {
      return response.json({
        "validate": true,
        "idUser": user.idUser
      })
    } else {
      return response.json({
        "validate": false 
      })
    }
  } else {
    return response.json({"message": "usuário não existe"});
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

app.post("/notification", async (request, response) => {
  const {
    userIdUser,
    nameUser,
    description,
    visualized
  } = notificationSchema.parse(request.body);

  const notification = await prisma.notification.create({
    data: {
      userIdUser: userIdUser,
      nameUser: nameUser,
      description: description,
      visualized: visualized
    }
  });

  return response.status(201).json(notification);
});

app.get("/notification/:id", async (request, response) => {
  const userId = request.params.id;

  const notifications = prisma.notification.findMany({
    where: {
      userIdUser: userId
    }
  });

  return response.json(notifications);
})

app.listen("3333");