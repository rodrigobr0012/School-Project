import { FC } from 'react';
import TaskForm from '../components/Taskform';
import TaskList from '../components/Tasklist';

const Home: FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Gerenciador de Tarefas</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Home;
