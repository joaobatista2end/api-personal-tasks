import { CheckIcon, CircleIcon, Trash2Icon, XIcon } from "lucide-react";
import { TaskDto } from "../types";
import { TaskIcon } from "./TaskIcon";

interface TaskItemProps {
  task: TaskDto;
  taskLoading: string;
  onToggle: (task: TaskDto) => void;
  onDelete: (task: TaskDto) => void;
}

export const TaskItem = ({
  task,
  taskLoading,
  onToggle,
  onDelete,
}: TaskItemProps) => {
  return (
    <div
      className={`group max-w-fit cursor-pointer rounded-md flex items-center overflow-hidden ${
        task.completed ? "bg-green-500/10" : "bg-black/5"
      } `}
    >
      <TaskIcon category={task.category} />
      <div className="flex items-center gap-x-2 px-2">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task);
          }}
          className={`outline-2 h-[16px] w-[16px] ${
            task.completed ? "outline-green-700/90" : "outline-black/60"
          }  relative flex items-center justify-center rounded-full ${
            task.id === taskLoading && "opacity-15 disabled"
          }`}
        >
          {task.completed ? (
            <CheckIcon
              className="text-green-500 font-bold"
              size={12}
              strokeWidth={4}
            />
          ) : (
            <CircleIcon
              className="text-black/60 font-bold bg-black/10 rounded-full"
              size={12}
              strokeWidth={4}
            />
          )}
        </div>
        
        <div
          className={`${task.id === taskLoading && "opacity-15 disabled"}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task);
          }}
        >
          {task.id === taskLoading ? "Alterando status..." : task.title}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
          className="cursor-pointer"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
