import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Lazy load other pages for code splitting
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';

const Movies = lazy(() => import('./pages/Movies'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const BookingSuccess = lazy(() => import('./pages/BookingSuccess'));
const UserLogin = lazy(() => import('./pages/UserLogin'));
const UserRegister = lazy(() => import('./pages/UserRegister'));
const AdminMovies = lazy(() => import('./pages/AdminMovies'));
const UserBookings = lazy(() => import('./pages/UserBookings'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-1">
            <Suspense fallback={<div className="container mx-auto px-4 py-8"><Loading /></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:movieId" element={<MovieDetails />} />
                <Route path="/book/:showtimeId" element={<BookingPage />} />
                <Route path="/booking/:movieId/:showtimeId" element={<BookingPage />} />
                <Route path="/booking/success/:bookingId" element={<BookingSuccess />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/admin/movies" element={<AdminMovies />} />
                <Route path="/bookings/user/:userId" element={<UserBookings />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
