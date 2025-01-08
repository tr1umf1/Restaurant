import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
   const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await logout(); // Perform the logout action from your AuthContext
        navigate('/login'); // Redirect to the login page
      } catch (error) {
        console.error('Error logging out', error);
      }
    };

  return (
    <nav className="border-b w-[120%]" style={{ width: '100vw' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6" />
            <span className="font-bold text-xl">Gourmet Haven</span>
          </Link>

          <div className="flex space-x-4">
            {isAuthenticated && (
              <>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}