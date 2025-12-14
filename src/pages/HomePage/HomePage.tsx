import { Button } from '@shared/ui/Button/Button';
import { Link } from 'react-router-dom';

/**
 * Home Page
 * Route: /
 */
export const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold text-gray-800">
                    Finance Tracker
                </h1>
                <p className="text-xl text-gray-600">
                    Manage your finances with ease
                </p>
            </div>

            <div className="flex flex-col gap-4 mt-8">
                <Link to="/work-items">
                    <Button className="w-64">
                        View Work Items
                    </Button>
                </Link>

                <Link to="/transactions">
                    <Button variant="secondary" className="w-64">
                        Transactions (Coming Soon)
                    </Button>
                </Link>

                <Link to="/dashboard">
                    <Button variant="secondary" className="w-64">
                        Dashboard (Coming Soon)
                    </Button>
                </Link>
            </div>

            <div className="mt-12 text-sm text-gray-500">
                <p>Built with FSD Architecture</p>
            </div>
        </div>
    );
};
