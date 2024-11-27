import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// Caminho para o arquivo JSON
const filePath = path.join(__dirname, "../data/task.json");

// Garante que o arquivo JSON exista antes de realizar qualquer operação
const ensureFileExists = (): void => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
  }
};

// Função para carregar as tarefas do arquivo JSON
const loadTasks = (): any[] => {
  ensureFileExists(); // Garante que o arquivo existe
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
    return [];
  }
};

// Função para salvar as tarefas no arquivo JSON
const saveTasks = (tasks: any[]): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (err) {
    console.error("Erro ao salvar tarefas:", err);
  }
};

// Controlador para obter todas as tarefas
export const getTasks = (req: Request, res: Response): void => {
  try {
    const tasks = loadTasks();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar tarefas");
  }
};

// Controlador para criar uma nova tarefa
export const createTask = (req: Request, res: Response): void => {
  console.log("Recebendo requisição para criar tarefa:", req.body);

  const { title } = req.body;
  if (!title) {
    res.status(400).send("O campo 'title' é obrigatório.");
    return;
  }

  try {
    const tasks = loadTasks();
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log("Nova tarefa criada:", newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar tarefa");
  }
};

// Controlador para atualizar uma tarefa existente
export const updateTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { completed } = req.body;

  console.log(`Recebendo requisição para atualizar tarefa com ID ${id}`);

  if (typeof completed !== "boolean") {
    res.status(400).send("O campo 'completed' deve ser um booleano.");
    return;
  }

  try {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id, 10));

    if (taskIndex === -1) {
      res.status(404).send("Tarefa não encontrada");
      return;
    }

    tasks[taskIndex].completed = completed;
    saveTasks(tasks);
    console.log(`Tarefa com ID ${id} atualizada com sucesso.`);
    res.status(200).json(tasks[taskIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar tarefa");
  }
};

// Controlador para deletar uma tarefa
export const deleteTask = (req: Request, res: Response): void => {
  const { id } = req.params;

  console.log(`Recebendo requisição para deletar tarefa com ID ${id}`);

  try {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id, 10));

    if (taskIndex === -1) {
      res.status(404).send("Tarefa não encontrada");
      return;
    }

    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    console.log(`Tarefa com ID ${id} deletada com sucesso.`);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao deletar tarefa");
  }
};
