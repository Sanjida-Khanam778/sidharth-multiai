import { createBrowserRouter } from "react-router-dom";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import Home from "../Pages/Home/Home";
import Features from "../components/Features/Features";
import ForgetPass from "../components/ForgetPass/ForgetPass";
import VarifyOTP from "../components/VarifyOTP/VarifyOTP";
import ResetPass from "../components/ResetPass/ResetPass";
import Dashboard from "../Layouts/Dashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/features",
      //   element: <Features />,
      // },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/forget-password",
    element: <ForgetPass />,
  },
  {
    path: "/verify-otp",
    element: <VarifyOTP />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
]);
