import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(formData);
      const isTrue = data?.admin || false;
      if(isTrue){
        console.log(isTrue)
        localStorage.setItem("admin",isTrue)
        navigate("/admin")
      }
     else{
      navigate('/');
     } // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='h-screen w-full flex flex-col justify-center items-center bg-gray-50'>
        <div className='flex flex-col justify-center items-center'>
          <Link to="/"><img src='./logo.png' className='h-15 mb-10'/></Link>
          <p className='text-3xl items-center flex justify-center mb-3'>Sign in to account</p>
          <p className='text-2xl text-gray-700'>Don’t have an account? <Link to="/register" ><button className='underline text-[#01B8DA] cursor-pointer mb-20'>Sign up</button></Link> for a free trial.</p>
        </div>
        <form onSubmit={handleSubmit} className='bg-white pr-30 pl-30 pt-10 pb-20 flex flex-col justify-center items-center rounded-4xl shadow-2xl'>
          <div className='mt-10'>
          <p className='font-medium'>Email address</p>
          <input
            type="email"
            name="email"
            className='border-2 w-90 p-2 rounded-2xl'
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          </div>
          <div className='mt-10'>
          <p className='font-medium'>Password</p>
          <input
            type="password"
            name="password"
            className='border-2 w-90 p-2 rounded-2xl '
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading} className='flex justify-center items-center w-full bg-[#01B8DA] text-white mt-10 p-3 font-medium rounded-2xl cursor-pointer'>
            {loading ? 'Logging in...' : 'Sign in to account'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
