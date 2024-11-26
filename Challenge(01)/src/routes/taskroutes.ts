import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskcontroller";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
