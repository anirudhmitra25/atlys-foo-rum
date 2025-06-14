import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { login, signup, clearError } from "../../store/reducers/loginSlice";
import type { RootState } from "../../store/store";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get login state from Redux
  const { isLoggedIn, error, currentUser } = useSelector(
    (state: RootState) => state.login
  );

  const handleSignIn = (emailOrUsername: string, password: string) => {
    dispatch(login({ usernameEmail: emailOrUsername, password }));
  };

  const handleSignUp = (emailOrUsername: string, password: string) => {
    dispatch(signup({ userEmail: emailOrUsername, password }));
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Clear any existing errors when switching modes
    dispatch(clearError());
  };

  // Handle successful login/signup and errors
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      if (isSignUp) {
        // Show success toast for signup and switch to sign-in mode
        toast.success(
          `Account created successfully! Welcome, ${currentUser.email}!`
        );
        setIsSignUp(false); // Toggle to sign-in mode
      } else {
        // Show success toast for login and redirect to feed
        toast.success(`Welcome back, ${currentUser.email}!`);
        navigate("/feed");
      }
    } else if (error) {
      // Show error toast
      if (error === "Invalid credentials") {
        toast.error("Invalid credentials. Please try again.");
      } else if (error === "User already exists") {
        toast.error("User already exists. Please try logging in.");
      } else {
        toast.error(error);
      }
      // Clear error after showing toast
      dispatch(clearError());
    }
  }, [isLoggedIn, currentUser, error, isSignUp, navigate, dispatch]);

  return (
    <div className="flex flex-col items-center h-full">
      <div className="h-fit mt-10 rounded-3xl flex flex-col items-start justify-center p-2 bg-[#EBEBEB]">
        <div className="w-[40vw] min-w-[350px] max-w-[800px] h-fit rounded-3xl">
          {isSignUp ? (
            <SignUp onSignUp={handleSignUp} />
          ) : (
            <SignIn onSignIn={handleSignIn} />
          )}
        </div>
        <span className="text-[#00000099] mx-auto my-3">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            className="text-[#5057EA] mx-2 cursor-pointer"
            onClick={toggleMode}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </span>
      </div>
    </div>
  );
};

export default Login;
