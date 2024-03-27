import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import ThemeSwitcherComponent from '@/shared/components/theme switcher/ThemeSwitcherComponent';
import Navbar from '@/shared/layout/navbar';
import Home from '@/pages/home';
import ScrollToTop from '@/utils/ScrollToTop';
import Admin from '@/pages/admin/Admin';
import PrivateRoute from '@/routes/PrivateRoute';
import Footer from '@/shared/layout/footer';
import Preloader from '@/shared/components/preloader/Preloader';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { getMe, getMyLists } from './redux/slices/userSlice';
import './App.scss';

const Search = lazy(() => import('./pages/search'));
const Blogs = lazy(() => import('./pages/blogs'));
const Profile = lazy(() => import('./pages/profile'));
const User = lazy(() => import('./pages/user'));
const Login = lazy(() => import('./pages/login'));
const About = lazy(() => import('./pages/about/About'));
const ErrorPage = lazy(() => import('./pages/error'));
const SignUp = lazy(() => import('./pages/signup'));
const SignIn = lazy(() => import('./pages/signin'));
const Library = lazy(() => import('./pages/library'));
const Account = lazy(() => import('./pages/account'));

function App() {
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const isLoading = useAppSelector(state => state.authSlice.isLoading);
  const userId = useAppSelector(state => state.authSlice.userId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMe(userId));
    dispatch(getMyLists(userId));
  }, [ dispatch, userId ]);
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <ScrollToTop />
        <ThemeSwitcherComponent>
          <Routes>
            <Route element={(
              <>
                <Navbar />
                <Outlet />
                <Footer />
              </>
            )}>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<ErrorPage />} />
              <Route path='/search' element={<Search />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/about' element={<About />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/users/:id' element={<User />} />
              <Route path='/library' element={isAuth ? <Library /> : <Navigate to='/login' />} />
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