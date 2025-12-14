# CORS Troubleshooting & Solution Log

## 1. What is the "Logic" (The Problem)

**CORS (Cross-Origin Resource Sharing)** is a browser security feature.

*   **The Logic**: Browsers enforce the **Same-Origin Policy**. This means a web page running at `http://localhost:5173` (Frontend) is **not allowed** to fetch data from `http://localhost:5033` (Backend) because they have different **ports** (5173 vs 5033). They are considered different "origins".
*   **The Check**: Before making a request, the browser checks if the backend explicitly allows the frontend's origin via a header: `Access-Control-Allow-Origin`.
*   **The Block**: If that header is missing or doesn't match, the browser **blocks** the response to protect you.

## 2. How We Troubleshooted

I followed these steps to diagnose the issue from your screenshot:

1.  **Observation**: I saw red error messages in your console.
    *   `Access to XMLHttpRequest at '...' has been blocked by CORS policy`
    *   `No 'Access-Control-Allow-Origin' header is present`
2.  **Analysis**:
    *   **Frontend**: Running on `http://localhost:5173`
    *   **Backend**: API endpoint was `http://localhost:5033/api/...`
    *   **Conclusion**: reliable indication of a Cross-Origin block. The browser sees two different servers.

## 3. How We Solved It

There are two ways to solve this. We chose **Option A** (Vite Proxy) because it's better for development.

### Option A: The Proxy Solution (What we did) ✅

Instead of the frontend talking *directly* to the backend, we tell the **Vite Development Server** to act as a middleman.

1.  **The Flow**:
    *   Browser sends request to `http://localhost:5173/api/WorkItems` (Same origin! No CORS block).
    *   Vite Server sees `/api`, catches it, and silently forwards it to `http://localhost:5033/api/WorkItems`.
    *   Backend responds to Vite.
    *   Vite responds to Browser.

2.  **The Code**:
    *   **`vite.config.ts`**:
        ```typescript
        server: {
          proxy: {
            '/api': {
              target: 'http://localhost:5033', // The actual backend
              changeOrigin: true, // Trims the origin so backend accepts it
              secure: false,
            },
          },
        }
        ```
    *   **`.env`**:
        ```bash
        VITE_API_URL=/api  # Relative path, so it hits the proxy
        ```

### Option B: The Backend Solution (Alternative)

You *could* have changed the C# Code to allow the frontend.
*   **Pros**: Needed for production deployment.
*   **Cons**: Requires restarting backend, changing C# code.

**Mock C# Code for reference:**
```csharp
app.UseCors(policy => 
    policy.WithOrigins("http://localhost:5173") // Allow your frontend
          .AllowAnyMethod()
          .AllowAnyHeader());
```

## 4. Why this happened now?

When you moved from a simple HTML/JS file or a tightly coupled MVC app to a **Stand-alone SPA (React)**, you physically separated the "Client" from the "Server". They are now two separate programs running on different ports, triggering the browser's security logic.
