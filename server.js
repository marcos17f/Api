import express from "express";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

// CREATE
app.post("/usuarios", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  return res.status(201).json(user);
});

// READ
app.get("/usuarios", async (req, res) => {
  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: {
          contains: req.query.name,
          email: req.query.email,
          age: req.query.age,
        },
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  return res.status(200).json(users);
});

// UPDATE
app.put("/usuarios/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  return res.status(200).json(user);
});

// DELETE
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.status(200).json({ message: "Usuário deletado com sucesso" });
});

// SERVER
app.listen(3000, () => {
  console.log("Servidor rodando 🚀");
});
