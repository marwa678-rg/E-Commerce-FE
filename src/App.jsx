import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import { Login } from "./Pages/Login/Login";
import { Toaster } from "react-hot-toast";
import { PublicNavbar } from "./Components/PublicNavbar/PublicNavbar";
import { VerifyOtp } from "./Pages/Verify-OTP/VerifyOtp";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./Pages/ResetPassword/ResetPassword";
import { api } from "./API/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleError } from "./utils/errorHandler";
import { loginSuccess } from "./store/Slices/UserSlice";

function App() {
  //Token
  const token = localStorage.getItem("token");
  //Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    async function validateToken() {
      if (!token) return;
      try {
        const response = await api.get("/auth/myInfo");
        dispatch(loginSuccess(response.data?.user || response.data));
      } catch (error) {
        handleError(error);
        localStorage.removeItem("token");
      }
    }

    validateToken();
  }, [dispatch, token]);

  return (
    <>
      <Toaster position="top-left" />
      <PublicNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
