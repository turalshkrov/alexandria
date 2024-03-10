
import Button from "@/shared/components/button";
import "./index.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="page page-without-navbar">
      <div className="container mb-md-0">
        <div className="py-3 register-content text-center">
          <h1 className="logo-title">Alexandria</h1>
          <h1 className="mt-2">Create Account</h1>
          <form className="register-form form-control mt-2">
            <div className="form-item">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name"/>
            </div>
            <div className="form-item">
              <label htmlFor="username">Username</label>
              <input type="text" id="username"/>
            </div>
            <div className="form-item">
              <label htmlFor="email">Email</label>
              <input type="email" id="email"/>
            </div>
            <div className="form-item">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password"/>
            </div>
            <p className="mt-2">
            By creating an account, you agree to the Alexandria <Link to='/terms'>Terms of Service</Link> and <Link to='/privacy'>Privacy Policy</Link>
            </p>
            <Button
              className="mt-2">
              Create Account
            </Button>
            <p className="mt-3">
              Already have an account? <Link to='/sign'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;