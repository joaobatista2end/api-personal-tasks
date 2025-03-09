import { TaskCreateDto, TaskDto, TaskUpdateDto } from "./types";



export class TaskService {
    private static resource: string = "http://localhost:8000/api/tasks";
    private static defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    static async getTasks(): Promise<TaskDto[]> {
        const response = await fetch(TaskService.resource, {
            headers: TaskService.defaultHeaders
        });
        if (!response.ok) throw new Error("Erro ao buscar as tasks");
        return response.json();
    }

    static async getTask(id: string): Promise<TaskDto> {
        const response = await fetch(`${TaskService.resource}/${id}`, {
            headers: TaskService.defaultHeaders
        });
        if (!response.ok) throw new Error("Erro ao buscar a task");
        return response.json();
    }

    static async createTask(task: TaskCreateDto): Promise<TaskDto> {
        const response = await fetch(TaskService.resource, {
            method: "POST",
            headers: TaskService.defaultHeaders,
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Erro ao criar a task");
        return response.json();
    }

    static async updateTask(id: string, task: TaskUpdateDto): Promise<TaskDto> {
        const response = await fetch(`${TaskService.resource}/${id}`, {
            method: "PATCH",
            headers: TaskService.defaultHeaders,
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Erro ao atualizar a task");
        return response.json();
    }

    static async deleteTask(id: string): Promise<void> {
        const response = await fetch(`${TaskService.resource}/${id}`, { 
            method: "DELETE",
            headers: TaskService.defaultHeaders
        });
        if (!response.ok) throw new Error("Erro ao deletar a task");
    }
}
