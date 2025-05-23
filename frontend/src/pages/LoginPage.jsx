import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, MessageSquare, Lock ,Loader2  } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../Components/AuthImagePattern';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password:"",
  })

  const login = useAuthStore((store) => store.login);
  const isLoggingIng = useAuthStore((store) => store.isLoggingIng);

  const validateForm = () => {
   
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password) return toast.error("Passowrd is required");
    if (formData.password.length < 6)
      return toast.error("Password must be greater than 6");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const sucess = validateForm();

    if (sucess === true) {
      login(formData);
    }
    console.log("Hello")
  }
 
  return (
    <div className=" min-h-screen grid lg:grid-cols-2">
      {/* left side  */}
      <div className=" flex items-center justify-center  flex-col p-6 sm:p-12">
        <div className=" w-full max-w-md  space-y-8">
          {/* LOGO */}
          <div className=" text-center mb-8">
            <div className=" flex flex-col items-center gap-2 group">
              <div className=" size-12 rounded-xl bg-primary/10  flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className=" size-6 text-primary" />
              </div>

              <h1 className=" text-2xl font-bold mt-2">Welcome back</h1>
              <p className=" text-base-content/60">Sign In Your account</p>
            </div>
          </div>

          <form action="" onSubmit={handleSubmit} className=" space-y-6">
            <div className=" form-control">
              <label className=" label">
                <span className=" label-text font-medium">Email</span>
              </label>
              <div className=" relative">
                <div className="  absolute inset-y-0 left-1 flex items-center pointer-events-none">
                  <Mail className=" size-5 text-base-content/40 " />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 bg-transparent"
                  placeholder="your@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value, // Corrected spelling here
                    })
                  }
                />
              </div>
            </div>

            <div className=" form-control">
              <label className=" label">
                <span className=" label-text font-medium">Password</span>
              </label>
              <div className=" relative">
                <div className="  absolute inset-y-0 left-1 flex items-center pointer-events-none">
                  <Lock className=" size-5 text-base-content/40 " />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 bg-transparent"
                  placeholder="..............."
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value, // Corrected spelling here
                    })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className=" btn btn-primary  w-full"
              disabled={isLoggingIng}
            >
              {isLoggingIng ? (
                <>
                  <Loader2 className=" size-5 animate-spin" />
                  Loading.....
                </>
              ) : (
                ""
              )}
              Login
            </button>
          </form>
          <div className=" text-center ">
            <p className=" text-base-content/60 ">
              Dont't have an account?{" "}
              <Link to={"/signup"} className=" link link-primary">
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side  */}
      <AuthImagePattern
        title={"Join Our Community"}
        subtitle={
          "Connect with friends ,share moments ,and stay with touch wiith your loved once"
        }
      />
    </div>
  );
}

export default LoginPage