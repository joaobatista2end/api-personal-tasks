import { useState } from "react";
import { TaskService } from "../service";
import { TaskCategory } from "../types";
import { PlusIcon, SaveIcon } from "lucide-react";
import { Modal } from "../../shared/components/Modal";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export const TaskForm = ({ isOpen, onClose, onTaskCreated }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TaskCategory>("home");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await TaskService.createTask({
        title,
        description,
        category,
        completed: false,
      });

      // Reset form
      setTitle("");
      setDescription("");
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Tarefa">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="space-y-2 w-1/2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-700"
            >
              Título da Tarefa
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o título da tarefa"
              required
            />
          </div>

          <div className="space-y-2 w-1/2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-zinc-700"
            >
              Categoria
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
            >
              <option value="home">Casa</option>
              <option value="work">Trabalho</option>
              <option value="health">Saúde</option>
              <option value="recreation">Recreação</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-zinc-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite a descrição da tarefa"
            rows={3}
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-700 bg-zinc-100 rounded-md hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer px-4 inline-flex items-center gap-2 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SaveIcon className="w-4 h-4" />
            {loading ? "Criando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
