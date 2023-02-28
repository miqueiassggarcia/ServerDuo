import express from "express";
import CryptoJS from "crypto-js";

import { PrismaClient } from "@prisma/client";

import { userSchema, userLoginSchema } from "./validation/User"
import { gameSchema } from "./validation/Game"

const app = express();
app.use(express.json());

const prisma = new PrismaClient({
  log: ["query"]
});

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

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany();

  response.json(games);
});

// app.post("/mail", (request, response) => {
//     return response.json({});
// });

// app.post("/code", (request, response) => {
//     return response.json({});
// });

// app.get("/home", (request, response) => {
//     return response.status(201).json({teste: "teste"})
// })

// app.put("/user/id:", (request, response) => {
//     return response.json({});
// });

app.listen("3333");