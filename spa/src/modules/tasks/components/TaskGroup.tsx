import { TaskDto } from '../types';
import { TaskItem } from './TaskItem';

interface TaskGroupProps {
  title: string;
  tasks: TaskDto[];
  taskLoading: string;
  onToggle: (task: TaskDto) => void;
  onDelete: (task: TaskDto) => void;
}

export const TaskGroup = ({ title, tasks, taskLoading, onToggle, onDelete }: TaskGroupProps) => {
  return (
    <div className='flex-1 border border-gray-200 rounded-md pt-1 pb-2 px-2 bg-white'>
      <h2 className='text-md font-bold mb-2 text-zinc-700'>{title}</h2>
      <div className='space-y-1'>
        {tasks.map((task) => (
          <TaskItem 
            key={task.id}
            task={task}
            taskLoading={taskLoading}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}; 