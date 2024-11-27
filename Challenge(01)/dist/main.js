"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const taskroutes_1 = __importDefault(require("./routes/taskroutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Servir a página HTML em /tasks somente para o navegador
app.get("/tasks/html", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
// Rotas API para CRUD
app.use("/tasks", taskroutes_1.default);
// Rota principal
app.get("/", (req, res) => {
    res.send("Servidor rodando! Use /tasks para o CRUD ou /tasks/html para a página de tarefas.");
});
// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
