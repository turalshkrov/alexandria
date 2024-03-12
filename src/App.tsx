import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ThemeSwitcherComponent from '@/shared/components/theme switcher/ThemeSwitcherComponent';
import Navbar from '@/shared/layout/navbar';
import Home from '@/pages/home';
import ScrollToTop from '@/utils/helpers/ScrollToTop';
import Admin from '@/pages/admin/Admin';
import PrivateRoute from '@/routes/PrivateRoute';
import Footer from '@/shared/layout/footer';
import Preloader from '@/shared/components/preloader/Preloader';
import './App.scss';

const Search = lazy(() => import('./pages/search'));
const Blogs = lazy(() => import('./pages/blogs'));
const Profile = lazy(() => import('./pages/profile'));
const About = lazy(() => import('./pages/about/About'));
const ErrorPage =  lazy(() => import('./pages/error'));
const SignUp = lazy(() => import('./pages/signup'));
const Login = lazy(() => import('./pages/login'));

function App() {
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
              <Route path='/profile' element={<Profile />} />
              <Route path='/about' element={<About />} />
            </Route>
            <Route element={(
              <>
              <Outlet />
              <Footer />
              </>
            )}>
              <Route path='/register' element={<SignUp />}/>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route element={<PrivateRoute isAuthenticated={true} />}>
              <Route path='/admin' element={<Admin />}></Route>
            </Route>
          </Routes>
        </ThemeSwitcherComponent>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;