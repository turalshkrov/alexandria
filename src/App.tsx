import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ThemeSwitcherComponent from './shared/components/theme switcher/ThemeSwitcherComponent';
import Navbar from './shared/layout/navbar/Navbar';
import Home from './pages/home/Home';
import ScrollToTop from './utils/helpers/ScrollToTop';
import Admin from './pages/admin/Admin';
import PrivateRoute from './routes/PrivateRoute';
import Footer from './shared/layout/footer/Footer';
import './App.scss';
import Preloader from './shared/components/preloader/Preloader';

const Search = lazy(() => import('./pages/search/Search'));
const Blogs = lazy(() => import('./pages/blogs/Blogs'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const About = lazy(() => import('./pages/about/About'));
const ErrorPage =  lazy(() => import('./pages/error/ErrorPage'));

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