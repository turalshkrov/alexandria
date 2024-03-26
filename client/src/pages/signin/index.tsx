import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import Button from "@/shared/components/button";
import '../signup/index.scss';
import './index.scss'
import { useAppDispatch } from "@/hooks/hook";
import { login } from "@/redux/slices/authSlice";

type loginForm = {
  email: string,
  password: string
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<loginForm>();
  const [ showPassword, setshowPassword ] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<loginForm> = (data) => { 
    dispatch(login(data));
  };

  return (
    <div className='page page-vertical-center' id='login-page'>
      <div className="container">
        <div className="login-content text-center py-4 py-md-3">
          <h1 className="logo-title">Alexandria</h1>
          <h1 className="mt-2">Sign in</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="register-form form-control mt-2">
            <div className="form-item">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })} />
            </div>
            <div className="form-item password-item">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true,
                  minLength: 8,
                  maxLength: 30,
                })} 
              />
              <span 
                className="show-password"
                onClick={() => setshowPassword(!showPassword)}>
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            <p className="mt-2">
              By sign in, you agree to the Alexandria <Link to='/terms'>Terms of Service</Link> and <Link to='/privacy'>Privacy Policy</Link>
            </p>
            <Button
              type="submit"
              className="mt-2">
              Sign in
            </Button>
            <p className="mt-2">
              New in Alexandria? <Link to='/signup'>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn;