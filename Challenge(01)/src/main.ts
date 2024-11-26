import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskroutes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use("/tasks", taskRoutes);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// Rota principal
app.get("/", (req, res) => {
  res.send("Servidor rodando! Use a rota /tasks para interagir com o CRUD.");
});
// Servir a página HTML em /tasks
app.get("/tasks", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rotas
app.use("/tasks", taskRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
