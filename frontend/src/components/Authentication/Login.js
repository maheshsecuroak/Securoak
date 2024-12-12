import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';


function Login() {
  const [workspace, setWorkspace] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!workspace || !password) {
      setError('Please enter both workspace and password');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Login attempt', { workspace, password });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Please sign in to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="workspace" className="block text-sm font-medium text-gray-700">
            Workspace Name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="workspace"
              type="text"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              placeholder="Enter workspace name"
              required
              className="flex-1 py-3 block w-full rounded-l-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
            <span className="inline-flex items-center px-3 bg-gray-700 rounded-r-md border border-l-0 border-gray-300  text-white sm:text-sm">
              .securoak.com
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="mt-1 py-3 block w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}
        
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleLogin}
          
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
          }`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-sm text-center">
          <Link to="/forgot-password" className="font-medium text-black hover:text-black-dark">
            Forgot Password?
          </Link>
        </div>
        <div className="text-sm text-center">
          New to Securoak?{' '}
          <Link to="/signup" className="font-medium text-black hover:text-black-dark">
            Create an account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;