import { useNavigate, useLocation } from "react-router-dom";
import loginSvg from "../assets/login.svg";
import logoSvg from "../assets/logo.svg";
import Button from "./common/Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../store/reducers/loginSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleBackToHomeClick = () => {
    navigate("/feed");
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="w-full h-[10vh] px-6 py-4 ">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Logo and brand name */}
        <div className="flex items-center space-x-3">
          <img src={logoSvg} alt="Logo" className="w-6 h-6" />
          <span className="text-sm font-semibold text-gray-800">foo-rum</span>
        </div>

        {/* Right side - Login text and icon OR back to home */}
        <Button
          type="TERTIARY"
          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
          onClick={
            isLoginPage
              ? handleBackToHomeClick
              : isLoggedIn
              ? handleLogoutClick
              : handleLoginClick
          }
        >
          {isLoginPage ? (
            <span className="text-gray-700 font-medium">Back to home</span>
          ) : (
            <>
              {isLoggedIn ? (
                <span className="text-gray-700 font-medium">logout</span>
              ) : (
                <span className="text-gray-700 font-medium">login</span>
              )}
              <img src={loginSvg} alt="Login" className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
