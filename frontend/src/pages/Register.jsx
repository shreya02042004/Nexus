import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await register(name, email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zen-bg p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md bg-zen-bg/10 backdrop-blur border border-zen-border rounded-lg p-8 relative z-10 animate-in fade-in duration-700">
                <div className="text-center mb-8">
                    <div className="mb-6 flex items-center justify-center">
                        <span className="text-white font-bold text-4xl tracking-tighter">Nexus</span>
                    </div>
                    <h1 className="text-xl font-medium text-txt-muted tracking-tight">
                        Join Nexus
                    </h1>
                    <p className="mt-2 text-txt-muted text-sm">Start managing projects with clarity.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded text-sm text-center mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-mono text-txt-dim mb-1.5 uppercase">Full Name</label>
                        <input
                            type="text"
                            required
                            className="input-zen bg-zen-surface"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-txt-dim mb-1.5 uppercase">Email</label>
                        <input
                            type="email"
                            required
                            className="input-zen bg-zen-surface"
                            placeholder="name@nexus.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-txt-dim mb-1.5 uppercase">Password</label>
                        <input
                            type="password"
                            required
                            className="input-zen bg-zen-surface"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-zen btn-zen-primary mt-2 justify-between group"
                    >
                        <span>Create Account</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center text-sm text-txt-muted mt-8">
                    Have an account?{' '}
                    <Link to="/login" className="text-white font-medium hover:underline decoration-white/30 underline-offset-4">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
