import { useEffect, useState } from 'react';
import { debounce } from '../shared/utils/debounce';
import { Loading } from './components/Loading';
import { TaskForm } from './components/TaskForm';
import { TaskGroup } from './components/TaskGroup';
import { TaskService } from './service';
import { TaskDto } from './types';

export const TaskList = () => {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskLoading, setTaskLoading] = useState<string>('');

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
      <TaskForm onTaskCreated={fetchTasks} />
      
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
