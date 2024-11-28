import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskroutes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Servir a página HTML em /tasks somente para o navegador
app.get("/tasks/html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rotas API para CRUD
app.use("/tasks", taskRoutes);

// Rota principal
app.get("/", (req, res) => {
  res.send("Servidor rodando! Use /tasks para o CRUD ou /tasks/html para a página de tarefas.");
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
