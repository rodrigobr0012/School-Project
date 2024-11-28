import { useState } from 'react';
import api from '../utils/api';

const TaskForm = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) return;

    try {
      await api.post('/', { title });
      setTitle('');
    } catch (error) {
      console.error('Erro ao criar tarefa', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 mb-8">
      <input
        type="text"
        className="px-4 py-2 border border-gray-300 rounded w-full"
        placeholder="Adicionar nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Adicionar
      </button>
    </form>
  );
};

export default TaskForm;
