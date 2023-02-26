import express from "express";
import CryptoJS from "crypto-js";

import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient({
  log: ["query"]
});

app.post("/singin", async (request, response) => {
  const body = request.body;
  const words = CryptoJS.SHA256(body.password);
  const hash = words.toString();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      photoLink: body.photoLink,
      email: body.email,
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
})

// app.post("/login", (request, response) => {
//     return response.json({});
// });


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