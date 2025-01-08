import {createContext,useContext,useState,ReactNode,useEffect,} from 'react';
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: { email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      setUser({ email: decodedToken.email });
    }
  }, []);

  const login = (email: string, password: string) => {

    const fakeToken = JSON.stringify({ email }); 
    localStorage.setItem('token', fakeToken); 
    setIsAuthenticated(true);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
