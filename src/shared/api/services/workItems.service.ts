import { apiClient, handleApiResponse } from '../client';
import type { WorkItemsResponse, WorkItemResponse, WorkItem } from '../types';

/**
 * Work Items API Service
 * Example service for interacting with TaskManager backend
 */
export class WorkItemsService {
    private readonly basePath = '/WorkItems';

    /**
     * Get all work items/tasks
     * @returns Promise<WorkItem[]>
     */
    async getAllTasks(): Promise<WorkItem[]> {
        try {
            console.log('Fetching all tasks from', `${this.basePath}/GetAllTasks`);
            const response = await apiClient.get<WorkItemsResponse>(
                `${this.basePath}/GetAllTasks`
            );
            console.log('Received response:', response);

            // Handle the ResponseModel structure from backend
            return handleApiResponse(response.data);
        } catch (error) {
            console.error('Failed to fetch all tasks:', error);
            throw error;
        }
    }

    /**
     * Get a single work item by ID
     * @param id - Work item ID
     * @returns Promise<WorkItem>
     */
    async getTaskById(id: number): Promise<WorkItem> {
        try {
            const response = await apiClient.get<WorkItemResponse>(
                `${this.basePath}/${id}`
            );

            return handleApiResponse(response.data);
        } catch (error) {
            console.error(`Failed to fetch task ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create a new work item
     * @param workItem - Work item data (without ID)
     * @returns Promise<WorkItem>
     */
    async createTask(workItem: Omit<WorkItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkItem> {
        try {
            const response = await apiClient.post<WorkItemResponse>(
                this.basePath,
                workItem
            );

            return handleApiResponse(response.data);
        } catch (error) {
            console.error('Failed to create task:', error);
            throw error;
        }
    }

    /**
     * Update an existing work item
     * @param id - Work item ID
     * @param workItem - Updated work item data
     * @returns Promise<WorkItem>
     */
    async updateTask(id: number, workItem: Partial<WorkItem>): Promise<WorkItem> {
        try {
            const response = await apiClient.put<WorkItemResponse>(
                `${this.basePath}/${id}`,
                workItem
            );

            return handleApiResponse(response.data);
        } catch (error) {
            console.error(`Failed to update task ${id}:`, error);
            throw error;
        }
    }

    /**
     * Delete a work item
     * @param id - Work item ID
     * @returns Promise<void>
     */
    async deleteTask(id: number): Promise<void> {
        try {
            const response = await apiClient.delete<WorkItemResponse>(
                `${this.basePath}/${id}`
            );

            handleApiResponse(response.data);
        } catch (error) {
            console.error(`Failed to delete task ${id}:`, error);
            throw error;
        }
    }
}

// Export singleton instance
export const workItemsService = new WorkItemsService();
