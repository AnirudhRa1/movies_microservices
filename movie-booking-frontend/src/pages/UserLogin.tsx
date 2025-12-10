import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';
import { useAppStore } from '../store';
import { Film } from 'lucide-react';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const UserLogin = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();

  const handleLogin = async (values: { email: string; password: string }, { setSubmitting, setErrors }: any) => {
    try {
      console.log('Login form submitted:', values.email);
      const user = await loginUser(values.email, values.password);
      console.log('User logged in:', user);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Navigate to admin or home based on user type
      if (user.userType === 'CINEMA_ADMIN') {
        navigate('/admin/movies');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors({ email: error.message || 'Invalid credentials. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Film className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="label">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="input"
                    placeholder="john@example.com"
                  />
                  <ErrorMessage name="email" component="div" className="error-text" />
                </div>

                <div>
                  <label className="label">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="error-text" />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/user/register" className="text-primary-500 hover:text-primary-400">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
