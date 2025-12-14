import { useState, useEffect } from 'react';
import type { WorkItem } from '@shared/api';
import { workItemsService } from '@shared/api';
import { Button } from '@shared/ui/Button/Button';

/**
 * Example component showing how to use the WorkItems API service
 * This demonstrates the getAllTasks implementation
 */
export const TasksList = () => {
    const [tasks, setTasks] = useState<WorkItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all tasks
    const fetchTasks = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await workItemsService.getAllTasks();
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Example: Delete task
    const handleDelete = async (id: number) => {
        try {
            await workItemsService.deleteTask(id);
            // Refresh the list
            await fetchTasks();
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Work Items</h1>
                <Button onClick={fetchTasks} disabled={loading}>
                    {loading ? 'Loading...' : 'Refresh'}
                </Button>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Loading State */}
            {loading && !error && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading tasks...</p>
                </div>
            )}

            {/* Tasks List */}
            {!loading && !error && tasks.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No tasks found</p>
                </div>
            )}

            {!loading && tasks.length > 0 && (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {task.title}
                                    </h3>
                                    <p className="text-gray-600 mt-1">{task.description}</p>

                                    <div className="flex gap-3 mt-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${task.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : task.status === 'InProgress'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {task.status}
                                        </span>

                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${task.priority === 'High'
                                                ? 'bg-red-100 text-red-800'
                                                : task.priority === 'Medium'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <Button
                                        variant="secondary"
                                        className="text-sm"
                                        onClick={() => console.log('Edit task:', task.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="text-sm"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-3 text-xs text-gray-500">
                                Last updated: {new Date(task.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
