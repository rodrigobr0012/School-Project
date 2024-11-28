import { FC, useEffect, useState } from 'react';
import TaskItem from './taskitem';
import api from '../utils/api';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Carregar as tarefas do backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas', error);
      }
    };

    fetchTasks();
  }, []);

  // Marcar uma tarefa como concluída
  const toggleTaskComplete = async (id: number) => {
    try {
      await api.put(`/${id}`, { completed: true });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa', error);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          onToggleComplete={() => toggleTaskComplete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
