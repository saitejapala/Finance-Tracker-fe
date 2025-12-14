# 🚀 API Integration Guide

## Overview

This project uses a structured API service layer following the Feature-Sliced Design (FSD) architecture. All API-related code is located in `src/shared/api/`.

## 📁 File Structure

```
src/shared/api/
├── index.ts                    # Barrel export
├── types.ts                    # TypeScript types/interfaces
├── client.ts                   # Axios instance & interceptors
└── services/
    └── workItems.service.ts    # WorkItems API service
```

## 🔧 Quick Start

### 1. Environment Setup

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5033/api
```

### 2. Using the API Service

```typescript
import { workItemsService } from '@shared/api';

// Get all tasks
const tasks = await workItemsService.getAllTasks();

// Get single task
const task = await workItemsService.getTaskById(1);

// Create task
const newTask = await workItemsService.createTask({
  title: 'New Task',
  description: 'Task description',
  status: 'Pending',
  priority: 'High'
});

// Update task
const updated = await workItemsService.updateTask(1, {
  status: 'Completed'
});

// Delete task
await workItemsService.deleteTask(1);
```

## 📝 Backend ResponseModel Structure

Your C# backend uses this structure:

```csharp
public class ResponseModel
{
    public bool IsSuccess { get; set; }
    public object? Data { get; set; }
    public string Message { get; set; }
}
```

Our TypeScript equivalent:

```typescript
export interface ApiResponse<T = any> {
  message: string;
  isSuccess: boolean;
  data: T | null;
}
```

## 🎯 Creating New Services

Follow this pattern to add more API endpoints:

### Step 1: Define Types

Add to `src/shared/api/types.ts`:

```typescript
export interface Transaction {
  id: number;
  amount: number;
  category: string;
  date: string;
}

export type TransactionsResponse = ApiResponse<Transaction[]>;
export type TransactionResponse = ApiResponse<Transaction>;
```

### Step 2: Create Service

Create `src/shared/api/services/transactions.service.ts`:

```typescript
import { apiClient, handleApiResponse } from '../client';
import type { Transaction, TransactionsResponse } from '../types';

export class TransactionsService {
  private readonly basePath = '/transactions';

  async getAllTransactions(): Promise<Transaction[]> {
    try {
      const response = await apiClient.get<TransactionsResponse>(
        `${this.basePath}/GetAll`
      );
      return handleApiResponse(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw error;
    }
  }

  // Add more methods...
}

export const transactionsService = new TransactionsService();
```

### Step 3: Export Service

Add to `src/shared/api/index.ts`:

```typescript
export * from './services/transactions.service';
```

### Step 4: Use in Component

```typescript
import { transactionsService } from '@shared/api';

const TransactionsList = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await transactionsService.getAllTransactions();
      // Use data...
    };
    fetchData();
  }, []);
};
```

## 🔐 Authentication

The API client automatically adds auth tokens to requests:

```typescript
// Login and store token
localStorage.setItem('authToken', token);

// All subsequent requests will include:
// Authorization: Bearer <token>
```

## ⚠️ Error Handling

The API client includes global error handling:

```typescript
try {
  const data = await workItemsService.getAllTasks();
} catch (error) {
  // Error is already logged by interceptor
  // Handle UI state here
  setError('Failed to load tasks');
}
```

## 🎨 Example Component

See [TasksList.tsx](file:///c:/Projects/Finance-Tracker-fe/src/widgets/TasksList/TasksList.tsx) for a complete example showing:

- ✅ Data fetching with `useEffect`
- ✅ Loading states
- ✅ Error handling
- ✅ CRUD operations
- ✅ UI rendering with Tailwind

## 🔄 Backend Controller Mapping

Your backend controller in C#:

```csharp
[HttpGet("GetAllTasks")]
public async Task<IActionResult> GetAllTasks()
{
    var tasks = await _service.GetAllAsync();
    return Ok(new ResponseModel(true, tasks));
}
```

Frontend service method:

```typescript
async getAllTasks(): Promise<WorkItem[]> {
  const response = await apiClient.get<WorkItemsResponse>(
    `${this.basePath}/GetAllTasks`
  );
  return handleApiResponse(response.data);
}
```

## 📊 Response Handling

The `handleApiResponse` utility checks the backend response:

```typescript
export const handleApiResponse = <T>(response: ApiResponse<T>): T => {
  if (!response.isSuccess) {
    throw new Error(response.message || 'API request failed');
  }
  return response.data as T;
};
```

This ensures:
- ✅ Success responses return the data
- ❌ Failed responses throw errors with backend messages

## 🚦 Next Steps

1. **Update `.env`** with your actual backend URL
2. **Create services** for your other endpoints (transactions, users, etc.)
3. **Use the pattern** shown in `workItems.service.ts`
4. **Reference the example** in `TasksList.tsx` for component integration

Happy coding! 🎉

## ❓ Troubleshooting

### CORS Issues (Network Error / Access Blocked)
If you see "Access to XMLHttpRequest blocked by CORS policy", please read our [Deep Dive Guide](docs/CORS_TROUBLESHOOTING.md).

It explains:
*   Why the browser blocks cross-origin requests
*   How we use Vite Proxy to solve it
*   How to configure it correctly
