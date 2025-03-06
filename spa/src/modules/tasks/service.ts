import { TaskCreateDto, TaskDto, TaskUpdateDto } from "./types";



export class TaskService {
    private static resource: string = "http://localhost:8000/api/tasks";

    static async getTasks(): Promise<TaskDto[]> {
        const response = await fetch(TaskService.resource);
        if (!response.ok) throw new Error("Erro ao buscar as tasks");
        return response.json();
    }

    static async getTask(id: string): Promise<TaskDto> {
        const response = await fetch(`${TaskService.resource}/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar a task");
        return response.json();
    }

    static async createTask(task: TaskCreateDto): Promise<TaskDto> {
        const response = await fetch(TaskService.resource, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Erro ao criar a task");
        return response.json();
    }

    static async updateTask(id: string, task: TaskUpdateDto): Promise<TaskDto> {
        const response = await fetch(`${TaskService.resource}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Erro ao atualizar a task");
        return response.json();
    }

    static async deleteTask(id: string): Promise<void> {
        const response = await fetch(`${TaskService.resource}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erro ao deletar a task");
    }
}
