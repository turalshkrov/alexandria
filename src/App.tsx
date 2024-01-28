import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Blogs from './pages/blogs/Blogs';
import Profile from './pages/profile.tsx/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
