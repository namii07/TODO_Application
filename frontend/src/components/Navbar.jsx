import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-card border-b border-border px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <h1 className="text-xl font-bold tracking-tight text-primary uppercase">Todo App</h1>
                <div className="hidden sm:flex gap-4">
                    <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors font-medium">Dashboard</Link>
                    <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors font-medium">Profile</Link>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <span className="text-foreground font-medium hidden md:block">
                    Welcome, <span className="text-primary">@{user?.username}</span>
                </span>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all shadow hover:shadow-lg font-medium text-sm"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
