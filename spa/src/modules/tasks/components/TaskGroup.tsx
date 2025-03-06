import { TaskDto } from '../types';
import { TaskItem } from './TaskItem';

interface TaskGroupProps {
  title: string;
  tasks: TaskDto[];
  taskLoading: string;
  onToggle: (task: TaskDto) => void;
}

export const TaskGroup = ({ title, tasks, taskLoading, onToggle }: TaskGroupProps) => {
  return (
    <div className='flex-1'>
      <h2 className='text-md font-bold mb-2 text-zinc-700'>{title}</h2>
      <div className='space-y-1'>
        {tasks.map((task) => (
          <TaskItem 
            key={task.id}
            task={task}
            taskLoading={taskLoading}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}; 