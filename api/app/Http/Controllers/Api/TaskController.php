<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    // Listar todas as tarefas
    public function index()
    {
        return response()->json(Task::all());
    }

    // Criar uma nova tarefa
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'category' => 'required|in:work,personal,health'
        ]);

        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    // Exibir uma tarefa específica
    public function show(Task $task)
    {
        return response()->json($task);
    }

    public function patch(Request $request, Task $task)
    {
        $validated = $request->validate(rules: [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'completed' => 'sometimes|boolean',
            'category' => 'sometimes|required|in:work,personal,health'
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    // Atualizar uma tarefa
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'category' => 'required|in:work,personal,health'
        ]);

        $task->update($request->all());
        return response()->json($task);
    }

    // Excluir uma tarefa
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
