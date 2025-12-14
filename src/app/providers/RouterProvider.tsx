import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { HomePage } from '@pages/HomePage';
import { WorkItemsPage } from '@pages/WorkItemsPage';
import { DashboardPage } from '@pages/DashboardPage';
import { NotFoundPage } from '@pages/NotFoundPage';

/**
 * Global Router Configuration
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/work-items',
        element: <WorkItemsPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

export const RouterProvider = () => {
    return <ReactRouterProvider router={router} />;
};
