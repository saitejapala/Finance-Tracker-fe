/**
 * 404 Not Found Page
 */
export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600">Page not found</p>
            <a
                href="/"
                className="text-blue-600 hover:text-blue-700 underline"
            >
                Go back home
            </a>
        </div>
    );
};
