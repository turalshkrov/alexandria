import './App.scss';
import { ThemeProvider } from "./contexts/theme/ThemeContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Blogs from './pages/blogs/Blogs';
import Profile from './pages/profile.tsx/Profile';
import About from './pages/about/About';
import ScrollToTop from './components/scrollTop/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
