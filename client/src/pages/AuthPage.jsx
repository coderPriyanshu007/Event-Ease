import { useState } from "react";
import AuthCard from "../components/AuthCard";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "../api/auth";
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { setAuth } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (email, password) => {
    const toastId = toast.loading("Signing In", {
      hideProgressBar: true,
      autoClose: 1500,
    });
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      setTimeout(() => {
        setAuth(res);
        navigate('/');
        toast.update(toastId, {
          render: 'Signed In Successfully',
          hideProgressBar: true,
          autoClose: 1500,
          isLoading: false,
          type: 'success'
        });
      }, 2000);
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Login failed",
        hideProgressBar: true,
        autoClose: 1500,
        isLoading: false,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password, role) => {
    setLoading(true);
    const toastID = toast.loading("Registering...", {
      autoClose: 1500,
      hideProgressBar: true,
    });;
    try {
      const res = await registerUser({ username, email, password, role });
      toast.update(toastID, {
        render: 'User Registered Successfully',
        hideProgressBar: true,
        autoClose: 1500,
        isLoading: false,
        type: 'success'
      });
      await handleLogin(email, password);
    } catch (err) {
      toast.update(toastID, {
        render: err.message || 'Registration Failed',
        hideProgressBar: true,
        autoClose: 1500,
        isLoading: false,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-[90dvh] bg-gradient-to-br from-white to-red-100 p-4">
      <AnimatePresence>
        <motion.div
          layout
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-row  min-h-[350px] rounded-tl-[50%] rounded-bl-2xl  shadow-lg overflow-hidden"
        >
          <div to="/" className="flex justify-center items-center basis-1/3  bg-red-100 px-4">
            
            <span className="hidden md:block text-black text-lg font-bold ml-2">
              <span className='text-red-500'>Event</span> Ease
            </span>
          </div>
          <AuthCard title={isLogin ? "Sign In" : "Sign Up"}>
            {isLogin ? (
              <SignIn login={handleLogin} loading={loading} />
            ) : (
              <SignUp register={handleRegister} loading={loading} />
            )}
            <p className="mt-4 text-xs md:text-sm text-gray-600 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 hover:underline font-medium"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </AuthCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
