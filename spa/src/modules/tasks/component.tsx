import { useEffect, useState } from "react"
import { TaskService } from "./service"
import { TaskDto } from "./types";

export const TaskList =  () => {
    const [tasks, setTasks] = useState<TaskDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTasks = async () => {
        try {
            setLoading(true)
            const result = await TaskService.getTasks();
            if (result) setTasks(result)
        } catch(error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <pre>
            { loading ? 'Carregando...' : JSON.stringify(tasks) }
        </pre>
    )
}