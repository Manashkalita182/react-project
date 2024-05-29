import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing the close and eye icons

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const closeLogin = () => {
    navigate('/'); // Navigate to the home page or any other appropriate route
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className='relative mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 shadow-lg border border-gray-700'>
        <button 
          className='absolute top-4 right-4 text-gray-400 hover:text-white'
          onClick={closeLogin}
        >
          <FaTimes size={20} />
        </button>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight text-white'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-gray-400'>
          Don't have any account?&nbsp;
          <Link
            to='/signup'
            className='font-medium text-yellow-500 transition-all duration-200 hover:underline'
          >
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label='Email: '
              placeholder='Enter your email'
              type='email'
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <div className='relative'>
              <Input
                label='Password: '
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                {...register('password', {
                  required: true,
                })}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <Button
              type='submit'
              className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md'
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
