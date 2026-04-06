import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, AuthContext } from '../context/AuthContext';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        department: '',
        year: '',
        age: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Just perform register
            await api.post('/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please check inputs.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <div className="w-full max-w-lg bg-card p-8 rounded-2xl shadow-xl border border-border">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Create Account</h2>
                {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Username*</label>
                            <input
                                type="text" required
                                className="w-full bg-input border border-border rounded-lg p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Email*</label>
                            <input
                                type="email" required
                                className="w-full bg-input border border-border rounded-lg p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Password*</label>
                        <input
                            type="password" required minLength="6"
                            className="w-full bg-input border border-border rounded-lg p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Age</label>
                            <input
                                type="number"
                                className="w-full bg-input border border-border rounded-lg p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
                                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Year (1-4)</label>
                            <input
                                type="number" min="1" max="4"
                                className="w-full bg-input border border-border rounded-lg p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
                                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Department</label>
                            <input
                                type="text"
                                className="w-full bg-input border border-border rounded-lg p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-foreground/70 mt-6 text-sm">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
