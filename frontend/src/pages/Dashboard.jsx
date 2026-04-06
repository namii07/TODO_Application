import { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { data } = await api.get('/todos');
                setTodos(data);
            } catch (err) {
                console.error("Failed to load todos:", err);
            }
        };
        fetchTodos();
    }, []);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.title.trim()) return;
        try {
            const { data } = await api.post('/todos', newTodo);
            setTodos([data, ...todos]);
            setNewTodo({ title: '', description: '' });
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleComplete = async (id, isCompleted) => {
        try {
            const { data } = await api.patch(`/todos/${id}`, { completed: !isCompleted });
            setTodos(todos.map(t => t._id === id ? { ...t, completed: data.completed } : t));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/todos/${id}`);
            setTodos(todos.filter(t => t._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-12 pt-8">
            <main className="max-w-4xl mx-auto px-4 flex flex-col gap-8">

                {/* Todo Create Form */}
                <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
                    <h2 className="text-xl font-bold text-foreground mb-4">Create New Task</h2>
                    <form onSubmit={handleAddTodo} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Task Title (required)"
                            required
                            value={newTodo.title}
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                            className="bg-input border border-border rounded-xl p-3 text-foreground outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        />
                        <textarea
                            placeholder="Description (optional)"
                            rows={2}
                            value={newTodo.description}
                            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                            className="bg-input border border-border rounded-xl p-3 text-foreground outline-none focus:ring-2 focus:ring-primary shadow-sm resize-none"
                        />
                        <button type="submit" className="self-end bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all shadow hover:shadow-lg">
                            Add Task
                        </button>
                    </form>
                </section>

                {/* Todo List View */}
                <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border flex flex-col min-h-[400px]">
                    <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                        🚀 Your Active Tasks
                    </h2>

                    <div className="flex-1 space-y-4">
                        {todos.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-foreground/50 py-12">
                                <span className="text-5xl mb-4">🎉</span>
                                <p className="text-lg">No tasks remaining! You're all caught up.</p>
                            </div>
                        ) : (
                            todos.map(todo => (
                                <div key={todo._id} className={`flex items-start justify-between p-5 border rounded-xl group transition-colors ${todo.completed ? 'bg-secondary/20 border-border/50' : 'bg-background border-border hover:border-primary/50'}`}>
                                    <div className="flex items-start gap-4 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleToggleComplete(todo._id, todo.completed)}
                                            className="w-5 h-5 mt-1 accent-primary cursor-pointer rounded"
                                        />
                                        <div className={`flex flex-col flex-1 transition-all ${todo.completed ? 'opacity-50' : ''}`}>
                                            <span className={`text-lg font-medium text-foreground ${todo.completed ? 'line-through' : ''}`}>
                                                {todo.title}
                                            </span>
                                            {todo.description && (
                                                <span className="text-muted-foreground text-sm mt-1 whitespace-pre-wrap">{todo.description}</span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(todo._id)}
                                        className="ml-4 text-red-500 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
