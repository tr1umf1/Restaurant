import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import MakeReservation from '@/pages/MakeReservation';
import Dashboard from '@/pages/Dashboard';
import { AuthProvider } from '@/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="max-h-screen bg-background ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/make-reservation" element={<MakeReservation />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}