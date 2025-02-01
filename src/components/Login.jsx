import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // (show loader when click on login )
  const [error, setError] = useState(''); // (Sgow error)
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Product-management'; // (Change Website title)
  }, []);

  const handleLogin = async () => {
    setError(''); // Clear previous error
    if (!email && !password) {
      setError('Please enter both email and password.'); // (Show error message if fields are empty)
      return;
    }
    if (!email) {
        setError('Please enter email.'); // (Show error message if fields are empty)
        return;
      }

    if (!password) {
        setError('Please enter password'); // (Show Error message if fields are empty)
        return;
    }

     // (Email validation using regex if user not mention @)
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // (email format check)
     if (!emailRegex.test(email)) {
         setError('Please enter a valid email address.');
         return;
     }

    setLoading(true); // Set loading to true when login starts
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token); // (Save token)
      navigate('/home');
    }
    catch (error) {
        setLoading(false); // (Set loading to false if present error)
  
        // Check if the error response has a message to show
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error); // (Show error from API response)
        } else {
          setError('Login failed. Please try again.'); 
        }
      } finally {
        setLoading(false); // (Set loading to false after API response)
      }

     
    };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white m-2 p-8 rounded-lg shadow-lg w-96 ">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
      
      <div className="mb-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-7">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          
        />
      </div>
      
      <button
        onClick={handleLogin}
        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
       
        
      >
        {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div> 
              <span className="ml-2">Logging in...</span>
            </div>
          ) : (
            'Login'
          )}
      </button>
    </div>
  </div>
  );
};

export default Login;
