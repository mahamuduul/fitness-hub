import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      showToast('Please enter your name.', 'error');
      return;
    }
    if (!isValidEmail(formData.email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    if (formData.password.length < 6) {
      showToast('Password should be at least 6 characters.', 'error');
      return;
    }

    setIsLoading(true);
    const result = await register({ ...formData, role: 'user' });
    
    if (result.success) {
      showToast('Registration successful! Redirecting to login...', 'success');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      showToast(result.error, 'error');
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    const result = await loginWithGoogle();
    
    if (result.success) {
      showToast('Successfully signed up with Google!', 'success');
      setTimeout(() => navigate(result.redirect), 500);
    } else {
      showToast(result.error, 'error');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="min-h-screen py-12 px-4 bg-gray-50 flex items-center justify-center">
      <div className="max-w-[480px] w-full">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-gray-900 rounded-2xl items-center justify-center mb-4">
            <FaUserPlus className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our fitness community today</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-900">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-900">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-bold mb-2 text-gray-900">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Min 6 characters"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or sign up with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-xl text-red-500" />
              Sign up with Google
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account? <Link to="/login" className="text-gray-900 font-bold no-underline hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
