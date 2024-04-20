import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { Link } from 'react-router-dom';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { registerData } from "@/types";
import readingImg from '@/assets/images/reading.png';
import Button from '@/shared/components/button';
import axios from 'axios';
import "./index.scss";
import { toast } from "sonner";
import { userRegister } from "@/redux/slices/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  const [token, setToken] = useState<TokenResponse>();
  const [user, setUser] = useState<registerData>();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setToken(tokenResponse);
    },
  });
  useEffect(() => {
    if (token) {
      axios .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token?.access_token}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
          Accept: 'application/json'
      }})
      .then((res) => {
        console.log(res.data);
        setUser({
          name: res.data.name,
          email: res.data.email,
          username: res.data.email.replace('@gmail.com', ''),
          password: `${res.data.id}${import.meta.env.VITE_SIGNIN_SECRET_KEY}`,
        });
      })
    }
  }, [token]);
  useEffect(() => {
    if (user) toast.promise(dispatch(userRegister(user)).unwrap(), {
      loading: 'Loading...',
      success: (data) => {
        return data.data.message;
      },
      error: (error) => {
        return error.message;
      }
    });
  }, [dispatch, user]);
  return (
    <div className='page page-vertical-center'>
      <div className="container mb-2 mb-md-0">
        <div className="py-3 row d-f align-items-center signup-content">
          <div className="col-12 col-md-6 text-center">
            <img className='signup-illustrator' src={readingImg} alt="" />
            <p className='font-md font-md-lg fw-bold signup-page-text'>Track books you’ve read</p>
            <p className='font-md font-md-lg fw-bold signup-page-text'>Save those you want to read</p>
          </div>
          <div className="col-12 col-md-6 align-items-center mt-3 mt-md-0 d-f signup-btn-group">
            <Link to='/signup' className='d-b w-100 text-center'>
              <Button
                color='primary'
                style='solid'
                className='w-75 w-xl-50'>
                Sign up free
              </Button>
            </Link>
            <Button
              style='outline'
              color={theme === 'dark' ? 'light' : 'dark'}
              className='p-relative w-75 w-xl-50 mt-1 d-f align-items-center justify-center'
              onClick={() => login()} >
              <FaGoogle className='signup-btn-icon' />
              Continue with Google
            </Button>
            
            <Button
              style='outline'
              color={theme === 'dark' ? 'light' : 'dark'}
              className='p-relative w-75 w-xl-50 mt-1 d-f align-items-center justify-center'>
              <FaFacebook className='signup-btn-icon' />
              Continue with Facebook
            </Button>
            <Link to='/signin' className='d-b w-100 text-center'>
              <Button
                style='outline'
                color={theme === 'dark' ? 'light' : 'dark'}
                className='w-75 w-xl-50 mt-1'>
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}