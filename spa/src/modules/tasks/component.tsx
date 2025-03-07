import { useEffect, useState } from 'react';
import { debounce } from '../shared/utils/debounce';
import { Loading } from './components/Loading';
import { TaskForm } from './components/TaskForm';
import { TaskGroup } from './components/TaskGroup';
import { TaskService } from './service';
import { TaskDto } from './types';
import { PlusIcon } from "lucide-react";

export const TaskList = () => {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskLoading, setTaskLoading] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const result = await TaskService.getTasks();
      setTasks(result.filter(task => !task.completed));
      setCompletedTasks(result.filter(task => task.completed));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = debounce(async (task: TaskDto) => {
    try {
      setTaskLoading(task.id);
      const result = await TaskService.updateTask(task.id, {
        completed: !task.completed,
      });

      if (result) {
        task.completed = !task.completed;
        
        if (task.completed) {
          setTasks(tasks.filter(t => t.id !== task.id));
          setCompletedTasks([...completedTasks, task]);
        } else {
          setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
          setTasks([...tasks, task]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTaskLoading('');
    }
  }, 500);

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <Loading />;
  
  return (
    <div className="max-w-screen-md mx-auto p-4 mt-4 space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer px-4 inline-flex items-center gap-2 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Nova Tarefa
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      <TaskForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={() => {
          fetchTasks();
          setIsModalOpen(false);
        }}
      />
      
      <div className="bg-gray-100/50 rounded-md p-4 flex gap-x-4">
        <TaskGroup 
          title="Tarefas"
          tasks={tasks}
          taskLoading={taskLoading}
          onToggle={toggleTask}
        />
        
        <TaskGroup 
          title="Tarefas Concluídas"
          tasks={completedTasks}
          taskLoading={taskLoading}
          onToggle={toggleTask}
        />
      </div>
    </div>
  );
};
