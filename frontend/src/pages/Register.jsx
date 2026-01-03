import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setIsLoading(true);
        const result = await register(name, email, password);
        setIsLoading(false);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google OAuth
        console.log('Google login clicked');
    };

    const steps = [
        { number: 1, text: 'Setup your account', active: true },
        { number: 2, text: 'Setup your workspace', active: false },
        { number: 3, text: 'Make your project Live', active: false },
    ];

    return (
        <div className="min-h-screen h-screen flex overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
            {/* Left Side - Branding & Steps */}
            <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-end pb-20 px-16 overflow-hidden">
                {/* Noise/Matte texture overlay */}
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Main purple gradient glow */}
                <div
                    className="absolute top-0 left-0 right-0 h-[60%]"
                    style={{
                        background: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(147, 51, 234, 0.55) 0%, rgba(139, 92, 246, 0.3) 30%, rgba(88, 28, 135, 0.1) 60%, transparent 100%)',
                    }}
                />
                {/* Secondary glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
                    style={{
                        background: 'radial-gradient(ellipse at center top, rgba(168, 85, 247, 0.5) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 80%)',
                        filter: 'blur(50px)'
                    }}
                />

                {/* Content - positioned at bottom */}
                <div className="relative z-10">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        <span className="text-white text-base font-medium">Nexus</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl font-semibold text-white mb-2">
                        Get Started with Us
                    </h1>
                    <p className="text-gray-400 text-sm mb-8">
                        Complete these easy steps to register<br />your account.
                    </p>

                    {/* Steps - smaller font */}
                    <div className="space-y-3">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all ${step.active
                                        ? 'bg-white border-white'
                                        : 'bg-transparent border-gray-700/50'
                                    }`}
                            >
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step.active
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-800 text-gray-500'
                                    }`}>
                                    {step.number}
                                </span>
                                <span className={`text-sm ${step.active ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                    {step.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center px-8" style={{ backgroundColor: '#111111' }}>
                <div className="w-full max-w-sm">
                    {/* Header */}
                    <h2 className="text-2xl font-semibold text-white mb-1">Sign Up Account</h2>
                    <p className="text-gray-500 text-sm mb-6">Enter your details to create your account.</p>

                    {/* Google Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-700 bg-transparent text-white text-sm hover:bg-gray-800 transition-colors mb-5"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gray-800" />
                        <span className="text-gray-600 text-xs">Or</span>
                        <div className="flex-1 h-px bg-gray-800" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-400 text-xs mb-1.5">Name</label>
                            <input
                                type="text"
                                placeholder="eg. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-400 text-xs mb-1.5">Email</label>
                            <input
                                type="email"
                                placeholder="eg. john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-400 text-xs mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <p className="text-gray-600 text-xs mt-1.5">Must be at least 6 characters.</p>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-400 text-xs">{error}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-full bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-white hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
