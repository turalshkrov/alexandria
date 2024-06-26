import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useAppDispatch } from "@/hooks/hook";
import { userRegister } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import Button from "@/shared/components/button";
import "./index.scss";

export type Form = {
  name: string,
  username: string,
  email: string,
  password: string
}

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const [ showPassword, setshowPassword ] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Form> = async (data) => {
    toast.promise(dispatch(userRegister({ ...data })).unwrap(), {
      loading: 'Loading...',
      success: (data) => {
        return data.data.message;
      },
      error: (error) => {
        return error.message;
      }
    });
  };
  return (
    <div className="page page-vertical-center" id="signup-page">
      <div className="container mb-md-0">
        <div className="register-content py-4 py-md-3 text-center">
          <h1 className="logo-font">Alexandria</h1>
          <h1 className="mt-3">Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="register-form form-control mt-2" autoComplete="off">
            <div className="form-item">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true, maxLength: 64, pattern: /^[a-zA-Z\s]/ })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-danger font-sm">Name is required</span>
              )}
            </div>
            <div className="form-item">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                {...register("username", { required: true, minLength: 3, maxLength: 32, pattern: /^[a-zA-Z0-9]+$/ })}
              />
              {errors.username && errors.username.type === "required" && (
                <span className="text-danger font-sm">Username is required</span>
              )}
              {errors.username && errors.username.type === "minLength" && (
                <span className="text-danger font-sm">Username must conatin minimum 3 characters</span>
              )}
              {errors.username && errors.username.type === "pattern" && (
                <span className="text-danger font-sm">Username must conatin only English letters</span>
              )}
            </div>
            <div className="form-item">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: true,
                  maxLength: 30,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })} />
              {errors.email && errors.email.type === "required" && (
                <span className="text-danger font-sm">Email is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-danger font-sm">Email is not valid</span>
              )}
            </div>
            <div className="form-item password-item">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true,
                  minLength: 8,
                  maxLength: 32,
                  pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                })} 
              />
              <span 
                className="show-password"
                onClick={() => setshowPassword(!showPassword)}>
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
              {errors.password && errors.password.type === "required" && (
                <span className="text-danger font-sm">Password is required</span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="text-danger font-sm">Password must contain:<br/>
                At least one lowercase letter<br/>
                At least one uppercase letter<br/>
                At least one number<br/>
                At least one special character
                </span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="text-danger font-sm">Password must contain minimum 8 characters</span>
              )}
            </div>
            <p className="mt-2">
              By creating an account, you agree to the Alexandria <Link to='/terms'>Terms of Service</Link> and <Link to='/privacy'>Privacy Policy</Link>
            </p>
            <Button
              type="submit"
              className="mt-2">
              Create Account
            </Button>
            <p className="mt-2">
              Already have an account? <Link to='/signin'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;