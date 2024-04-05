import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { getMe, getMyLists, getMyReviews } from './redux/slices/userSlice';
import { Toaster } from 'sonner';
import ThemeSwitcherComponent from '@/shared/components/theme switcher/ThemeSwitcherComponent';
import Navbar from '@/shared/layout/navbar';
import Home from '@/pages/home';
import Profile from './pages/profile';
import ScrollToTop from '@/utils/ScrollToTop';
import Admin from '@/pages/admin/Admin';
import PrivateRoute from '@/routes/PrivateRoute';
import Footer from '@/shared/layout/footer';
import Preloader from '@/shared/components/preloader/Preloader';
import Modals from './shared/components/modals';
import './App.scss';

const Search = lazy(() => import('./pages/search'));
const Blogs = lazy(() => import('./pages/blogs'));
const User = lazy(() => import('./pages/user'));
const Login = lazy(() => import('./pages/login'));
const About = lazy(() => import('./pages/about/About'));
const ErrorPage = lazy(() => import('./pages/error'));
const SignUp = lazy(() => import('./pages/signup'));
const SignIn = lazy(() => import('./pages/signin'));
const Account = lazy(() => import('./pages/account'));
const ListPage = lazy(() => import('./pages/list'));
const BookPage = lazy(() => import('./pages/book'));

function App() {
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const isLoading = useAppSelector(state => state.authSlice.isLoading);
  const userId = useAppSelector(state => state.authSlice.userId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(getMe(userId));
      dispatch(getMyLists(userId));
      dispatch(getMyReviews(userId));
    }
  }, [dispatch, isAuth, userId]);
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <ScrollToTop />
        <ThemeSwitcherComponent>
          <Modals />
          <Routes>
            <Route element={(
              <>
                <Navbar />
                <Outlet />
                <Footer />
                <Toaster position="top-right" />
              </>
            )}>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<ErrorPage />} />
              <Route path='/search' element={<Search />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/about' element={<About />} />
              <Route path='/profile' element={isAuth ? <Profile /> : <Navigate to='/login' />} />
              <Route path='/users/:id' element={<User />} />
              <Route path='/books/:id' element={<BookPage />} />
              <Route path='/lists/:id' element={<ListPage />} />
              <Route path='/account' element={isAuth ? <Account /> : <Navigate to='/login' />} />
              <Route path='/login' element={!isAuth ? <Login /> : <Navigate to='/' />} />
            </Route>
            <Route element={(
              <>
                <Outlet />
                <Footer />
              </>
            )}>
              <Route path='/signup' element={!isAuth ? <SignUp /> : <Navigate to='/' />} />
              <Route path='/signin' element={!isAuth ? isLoading ? <Preloader /> : <SignIn /> : <Navigate to='/' />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/admin' element={<Admin />}></Route>
            </Route>
          </Routes>
        </ThemeSwitcherComponent>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;