import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../api/userApi';
import { useAppStore } from '../store';
import { Film, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  name: Yup.string().required('Full name is required'),
  phone: Yup.string().required('Phone number is required'),
});

const UserRegister = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      console.log('Registration form submitted:', values);
      console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
      
      const userData = {
        ...values,
        userType: 'CUSTOMER' as const,
      };
      const user = await createUser(userData);
      console.log('User registered successfully:', user);
      
      setSuccessMessage('Registration successful! Redirecting...');
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed. Email might already exist.';
      setErrors({ email: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Film className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Sign up to start booking tickets</p>
        </div>

        {successMessage && (
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-8">
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              name: '',
              phone: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="label">Full Name</label>
                  <Field type="text" name="name" className="input" placeholder="John Doe" />
                  <ErrorMessage name="name" component="div" className="error-text" />
                </div>

                <div>
                  <label className="label">Username</label>
                  <Field type="text" name="username" className="input" placeholder="johndoe" />
                  <ErrorMessage name="username" component="div" className="error-text" />
                </div>

                <div>
                  <label className="label">Email</label>
                  <Field type="email" name="email" className="input" placeholder="john@example.com" />
                  <ErrorMessage name="email" component="div" className="error-text" />
                </div>

                <div>
                  <label className="label">Phone Number</label>
                  <Field type="tel" name="phone" className="input" placeholder="+1234567890" />
                  <ErrorMessage name="phone" component="div" className="error-text" />
                </div>

                <div>
                  <label className="label">Password</label>
                  <Field type="password" name="password" className="input" placeholder="Minimum 6 characters" />
                  <ErrorMessage name="password" component="div" className="error-text" />
                </div>

                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Sign Up'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/user/login" className="text-primary-500 hover:text-primary-400">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
