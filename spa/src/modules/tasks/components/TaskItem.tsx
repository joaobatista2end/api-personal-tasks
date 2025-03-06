import { CheckIcon, CircleIcon } from 'lucide-react';
import { TaskDto } from '../types';
import { TaskIcon } from './TaskIcon';

interface TaskItemProps {
  task: TaskDto;
  taskLoading: string;
  onToggle: (task: TaskDto) => void;
}

export const TaskItem = ({ task, taskLoading, onToggle }: TaskItemProps) => {
  return (
    <div
      className={`max-w-fit cursor-pointer px-3 rounded-sm py-1 flex items-center gap-x-2 ${
        task.completed ? 'bg-green-500/10' : 'bg-black/5'
      } `}
      role="checkbox"
      onClick={() => onToggle(task)}
    >
      <div
        className={`outline-2 h-[16px] w-[16px] ${
          task.completed ? 'outline-green-700/90' : 'outline-black/60'
        }  relative flex items-center justify-center rounded-full ${
          task.id === taskLoading && 'opacity-15 disabled'
        }`}
      >
        {task.completed ? (
          <CheckIcon className='text-green-500 font-bold' size={12} strokeWidth={4} />
        ) : (
          <CircleIcon className='text-black/60 font-bold bg-black/10 rounded-full' size={12} strokeWidth={4} />
        )}
      </div>
      <div
        className={`${task.id === taskLoading && 'opacity-15 disabled'}`}
        onClick={() => onToggle(task)}
      >
        {task.id === taskLoading ? 'Alterando status...' : task.title}
      </div>

      <TaskIcon category={task.category} />
    </div>
  );
}; 