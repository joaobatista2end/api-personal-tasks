export type TaskCategory = 'health' | 'home' | 'work' | 'recriation'
export type TaskDto = {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    category: TaskCategory,
}

export type TaskCreateDto = Omit<TaskDto, 'id'>

export type TaskUpdateDto = Partial<TaskCreateDto>