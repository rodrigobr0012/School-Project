"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany();
        res.json(tasks);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar tarefas");
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newTask = yield prisma.task.create({ data: { title } });
        res.status(201).json(newTask);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar tarefa");
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const updatedTask = yield prisma.task.update({
            where: { id: parseInt(id, 10) },
            data: { completed },
        });
        res.json(updatedTask);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar tarefa");
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.task.delete({ where: { id: parseInt(id, 10) } });
        res.status(204).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro ao deletar tarefa");
    }
});
exports.deleteTask = deleteTask;
