import { useAppSelector } from './hooks/hook';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Blogs from './pages/blogs/Blogs';
import Profile from './pages/profile/Profile';
import About from './pages/about/About';
import ScrollToTop from './utils/helpers/ScrollToTop';
import ErrorPage from './pages/error/ErrorPage';
import Admin from './pages/admin/Admin';
import './App.scss';

function App() {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [ theme ]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={(
          <>
          <Navbar />
          <Outlet />
          </>
        )}>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        </Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
