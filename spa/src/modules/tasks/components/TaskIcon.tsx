import { BriefcaseBusinessIcon, Gamepad2Icon, HeartPulseIcon, HomeIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { TaskCategory } from '../types';

interface TaskIconProps {
  category: TaskCategory;
}

export const TaskIcon = ({ category }: TaskIconProps) => {
  const options: Record<TaskCategory, ReactNode> = {
    health: <HeartPulseIcon className='p-1 rounded-sm bg-red-400 text-red-950' size="20px"/>,
    home: <HomeIcon className='p-1 rounded-sm bg-blue-400 text-blue-950' size="20px"/>,
    recriation: <Gamepad2Icon className='p-1 rounded-sm bg-blue-400 text-blue-950' size="20px"/>,
    work: <BriefcaseBusinessIcon className='p-1 rounded-sm bg-amber-400 text-amber-950' size="20px"/>
  }

  return options[category] ?? null;
} 