import { FC } from 'react';

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggleComplete: () => void;
}

const TaskItem: FC<TaskItemProps> = ({ id, title, completed, onToggleComplete }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <span className={`text-lg ${completed ? 'line-through' : ''}`}>{title}</span>
      <button
        className={`px-4 py-2 rounded ${completed ? 'bg-green-500' : 'bg-blue-500'}`}
        onClick={onToggleComplete}
      >
        {completed ? 'Concluída' : 'Marcar como Concluída'}
      </button>
    </div>
  );
};

export default TaskItem;
