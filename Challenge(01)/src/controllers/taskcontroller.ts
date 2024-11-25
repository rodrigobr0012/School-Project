import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar tarefas");
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const newTask = await prisma.task.create({ data: { title } });
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar tarefa");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: { completed },
    });
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar tarefa");
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id: parseInt(id, 10) } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao deletar tarefa");
  }
};
