/**
 * Dashboard Page
 * Route: /dashboard
 * Future home for charts and analytics
 */
export const DashboardPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-xl text-gray-600">Analytics and Charts coming soon...</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-4xl px-4">
                {/* Placeholder for future charts */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-64 flex items-center justify-center">
                    <span className="text-gray-400">Expense Chart Placeholder</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-64 flex items-center justify-center">
                    <span className="text-gray-400">Income Chart Placeholder</span>
                </div>
            </div>
        </div>
    );
};
