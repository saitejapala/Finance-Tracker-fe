// Backend API Response Models - Matches C# ResponseModel
export interface ApiResponse<T = any> {
    message: string;
    isSuccess: boolean;
    data: T | null;
}

// WorkItem model (Task from backend)
export interface WorkItem {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
}

// Type aliases for common responses
export type WorkItemsResponse = ApiResponse<WorkItem[]>;
export type WorkItemResponse = ApiResponse<WorkItem>;
