import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('token');
			if (token) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
				router.push('/login'); // Redirect to login if not authenticated
			}
		}
	}, [router]);

	// Return a loading state or null while authentication status is being checked
	if (isAuthenticated === null) {
		return <div>Loading...</div>; // You can replace this with a spinner or your preferred loading component
	}

	return <>{isAuthenticated && children}</>;
};

export default ProtectedRoute;
