import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { getMe, getMyReviews } from './redux/slices/userSlice';
import { getMyLists } from './redux/slices/userListsSlice';
import { Toaster } from 'sonner';
import ThemeSwitcherComponent from '@/shared/components/theme switcher/ThemeSwitcherComponent';
import Navbar from '@/shared/layout/navbar';
import Home from '@/pages/home';
import Profile from './pages/profile';
import ScrollToTop from '@/utils/ScrollToTop';
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
const AuthorPage = lazy(() => import('./pages/author'));
const SeriesPage = lazy(() => import('./pages/series'));
const GenrePage = lazy(() => import('./pages/genre'));
const BlogPage = lazy(() => import('./pages/blog'));
const Admin = lazy(() => import('./admin/pages/dashboard'));
const AdminNavBar = lazy(() => import('./admin/components/navbar'));
const UsersDashboard = lazy(() => import('./admin/pages/users'));
const BooksDashboard = lazy(() => import('./admin/pages/books'));
const AuthorsDashboard = lazy(() => import('./admin/pages/authors'));
const SeriesDashboard = lazy(() => import('./admin/pages/series'));
const BlogsDashboard = lazy(() => import('./admin/pages/blogs'));
const CreateBook = lazy(() => import("./admin/pages/create book"));

function App() {
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const isLoading = useAppSelector(state => state.authSlice.isLoading);
  const userId = useAppSelector(state => state.userSlice.user?._id) || "";
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(getMe());
    }
  }, [dispatch, isAuth]);
  useEffect(() => {
    if (userId) {
      dispatch(getMyLists(userId));
      dispatch(getMyReviews(userId));
    }
  }, [dispatch, userId]);
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <ScrollToTop />
        <ThemeSwitcherComponent>
          <Modals />
          <Toaster position="top-right" />
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
              <Route path='/profile' element={isAuth ? <Profile /> : <Navigate to='/login' />} />
              <Route path='/users/:id' element={<User />} />
              <Route path='/books/:id' element={<BookPage />} />
              <Route path='/authors/:id' element={<AuthorPage />} />
              <Route path='/lists/:id' element={<ListPage />} />
              <Route path='/series/:id' element={<SeriesPage />} />
              <Route path='/blogs/:id' element={<BlogPage />} />
              <Route path='/genres/:genre' element={<GenrePage />} />
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
              <Route element={(
                <>
                  <AdminNavBar />
                  <Outlet />
                </>
              )}>
              <Route path='/admin-dashboard/index' element={<Admin />}></Route>
              <Route path='/admin-dashboard/users' element={<UsersDashboard />}></Route>
              <Route path='/admin-dashboard/books' element={<BooksDashboard />}></Route>
              <Route path='/admin-dashboard/books/create' element={<CreateBook />}></Route>
              <Route path='/admin-dashboard/authors' element={<AuthorsDashboard />}></Route>
              <Route path='/admin-dashboard/series' element={<SeriesDashboard />}></Route>
              <Route path='/admin-dashboard/blogs' element={<BlogsDashboard />}></Route>
              </Route>
            </Route>
          </Routes>
        </ThemeSwitcherComponent>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;