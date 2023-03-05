"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express = __toESM(require("express"));
var import_crypto_js = __toESM(require("crypto-js"));
var import_client = require("@prisma/client");

// src/validation/User.ts
var import_zod = require("zod");
var userSchema = import_zod.z.object({
  name: import_zod.z.string().min(3, { message: "O nome precisa de pelo menos 3 caracteres." }).max(50, { message: "O nome precisa de menos de 50 caracteres." }),
  photoLink: import_zod.z.string().min(11, { message: "Sua url precisa de pelos menos 11 caracteres." }).max(2048, { message: "O limite de tamanho da url foi excedido." }),
  email: import_zod.z.string().email({ message: "Seu email n\xE3o cont\xE9m formato v\xE1lido" }).min(4, { message: "Seu email precisa de pelo menos 4 caracteres." }).max(100, { message: "Seu email deve ter menos de 100 caracteres." }),
  password: import_zod.z.string().min(4, { message: "Sua senha \xE9 precisa de pelo menos 4 caracteres." }).max(100, { message: "Sua senha deve ter menos de 100 caracteres." })
});
var userLoginSchema = import_zod.z.object({
  email: import_zod.z.string().email({ message: "Seu email n\xE3o cont\xE9m formato v\xE1lido" }).min(4, { message: "Seu email precisa de pelo menos 4 caracteres." }).max(100, { message: "Seu email deve ter menos de 100 caracteres." }),
  password: import_zod.z.string().min(4, { message: "Sua senha \xE9 precisa de pelo menos 4 caracteres." }).max(100, { message: "Sua senha deve ter menos de 100 caracteres." })
});

// src/validation/Game.ts
var import_zod2 = require("zod");
var gameSchema = import_zod2.z.object({
  name: import_zod2.z.string().min(3, { message: "O nome precisa de pelo menos 3 caracteres." }).max(50, { message: "O nome precisa de menos de 50 caracteres." }),
  photoLink: import_zod2.z.string().min(11, { message: "Sua url precisa de pelos menos 11 caracteres." }).max(2048, { message: "O limite de tamanho da url foi excedido." })
});

// src/validation/Post.ts
var import_zod3 = require("zod");
var postSchema = import_zod3.z.object({
  gameIdGame: import_zod3.z.string(),
  userIdUser: import_zod3.z.string(),
  title: import_zod3.z.string().min(1, { message: "Seu titulo pracisa conter ao menos 1 caractere" }).max(50, { message: "Seu titulo tem que ter menos de 50 caracteres" }),
  description: import_zod3.z.string().min(1, { message: "Sua descricao pracisa conter ao menos 1 caractere" }).max(300, { message: "Sua descricao tem que ter menos de 300 caracteres" }),
  discord: import_zod3.z.string().min(6, { message: "Seu discord pracisa conter ao menos 6 caractere" }).max(30, { message: "Seu discord tem que ter menos de 30 caracteres" }),
  yearPlaying: import_zod3.z.number(),
  weekDays: import_zod3.z.number().array().transform((element) => element.toString()),
  hourStart: import_zod3.z.number().min(1, { message: "Valor menor que 1 \xE9 inv\xE1lido" }).max(1439, { message: "Valor maior que 1439 \xE9 inv\xE1lido" }),
  hourEnd: import_zod3.z.number().min(1, { message: "Valor menor que 1 \xE9 inv\xE1lido" }).max(1439, { message: "Valor maior que 1439 \xE9 inv\xE1lido" }),
  useVoiceChannel: import_zod3.z.boolean()
});

// src/validation/Notification.ts
var import_zod4 = __toESM(require("zod"));
var notificationSchema = import_zod4.default.object({
  userIdUser: import_zod4.default.string(),
  nameUser: import_zod4.default.string().min(1, { message: "Seu titulo pracisa conter ao menos 1 caractere" }).max(50, { message: "Seu titulo tem que ter menos de 50 caracteres" }),
  description: import_zod4.default.string().min(1, { message: "Sua descricao pracisa conter ao menos 1 caractere" }).max(300, { message: "Sua descricao tem que ter menos de 300 caracteres" }),
  visualized: import_zod4.default.boolean()
});

// src/server.ts
var app = (0, import_express.default)();
app.use(import_express.default.json());
var prisma = new import_client.PrismaClient({
  log: ["query"]
});
app.post("/singup", async (request, response) => {
  const { name, email, photoLink, password } = userSchema.parse(request.body);
  let exists = false;
  try {
    const userExists = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    });
    if (userExists) {
      console.log(true);
      exists = true;
    }
  } catch (err) {
    console.log(err);
  }
  if (!exists) {
    const words = import_crypto_js.default.SHA256(password);
    const hash = words.toString();
    const user = await prisma.user.create({
      data: {
        name,
        photoLink,
        email,
        hash
      }
    });
    return response.status(201).json(user);
  } else {
    return response.json({ "message": "usu\xE1rio j\xE1 existe" });
  }
});
app.get("/user/:id", async (request, response) => {
  const userId = request.params.id;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      select: {
        name: true,
        photoLink: true,
        email: true,
        hash: true
      },
      where: {
        idUser: userId
      }
    });
    return response.json(user);
  } catch (err) {
    console.log(err);
    return response.json({ "message": "usu\xE1rio n\xE3o existe" });
  }
});
app.post("/singin", async (request, response) => {
  const { email, password } = userLoginSchema.parse(request.body);
  let exists;
  let user;
  try {
    user = await prisma.user.findUniqueOrThrow({
      select: {
        idUser: true,
        hash: true
      },
      where: {
        email
      }
    });
    if (user) {
      exists = true;
    } else {
      exists = false;
    }
  } catch (err) {
    console.log(err);
    exists = false;
  }
  if (exists) {
    if (user?.hash === import_crypto_js.default.SHA256(password).toString()) {
      return response.json({
        "validate": true,
        "idUser": user.idUser
      });
    } else {
      return response.json({
        "validate": false
      });
    }
  } else {
    return response.json({ "message": "usu\xE1rio n\xE3o existe" });
  }
});
app.post("/game", async (request, response) => {
  const { name, photoLink } = gameSchema.parse(request.body);
  let exists = false;
  try {
    const gameExists = await prisma.game.findFirst({
      where: {
        name,
        photoLink
      }
    });
    if (gameExists) {
      exists = true;
    }
  } catch (err) {
    console.log(err);
  }
  if (!exists) {
    const game = await prisma.game.create({
      data: {
        name,
        photoLink
      }
    });
    return response.status(201).json(game);
  } else {
    return response.json({ "message": "O jogo j\xE1 existe" });
  }
});
app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany();
  response.json(games);
});
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
      userIdUser,
      gameIdGame,
      title,
      description,
      discord,
      yearPlaying,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel
    }
  });
  return response.status(201).json(post);
});
app.get("/posts/user/:id", async (request, response) => {
  const idUser = request.params.id;
  const posts = await prisma.post.findMany({
    where: {
      userIdUser: idUser
    }
  });
  response.json(posts);
});
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
      userIdUser,
      nameUser,
      description,
      visualized
    }
  });
  return response.status(201).json(notification);
});
app.get("/notification/:id", async (request, response) => {
  const userId = request.params.id;
  const notifications = await prisma.notification.findMany({
    where: {
      userIdUser: userId
    }
  });
  return response.json(notifications);
});
app.listen("3333");
