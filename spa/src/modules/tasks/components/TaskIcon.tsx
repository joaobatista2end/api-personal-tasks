import { BriefcaseBusinessIcon, Gamepad2Icon, HeartPulseIcon, HomeIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { TaskCategory } from '../types';

interface TaskIconProps {
  category: TaskCategory;
}

export const TaskIcon = ({ category }: TaskIconProps) => {
  const options: Record<TaskCategory, ReactNode> = {
    health: <div className='p-1 bg-red-400 text-red-950'><HeartPulseIcon size="20px"/></div>,
    home: <div className='p-1 bg-blue-400 text-blue-950'><HomeIcon size="20px"/></div>,
    recriation: <div className='p-1 bg-blue-400 text-blue-950'><Gamepad2Icon size="20px"/></div>,
    work: <div className='p-1 bg-amber-400 text-amber-950'><BriefcaseBusinessIcon size="20px"/></div>
  }

  return options[category] ?? null;
} 