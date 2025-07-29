import { createBrowserRouter } from "react-router-dom";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import Home from "../Pages/Home/Home";
import ForgetPass from "../components/ForgetPass/ForgetPass";
import VarifyOTP from "../components/VarifyOTP/VarifyOTP";
import ResetPass from "../components/ResetPass/ResetPass";
import Dashboard from "../Layouts/Dashboard";
import SessionDashboard from "../Layouts/SessionDashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import SuccessMsg from "../components/SuccessMsg/SuccessMsg";

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
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: ":id",
        element: <SessionDashboard />,
      },
    ],
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
  {
    path: "/success-msg",
    element: <SuccessMsg />,
  },
]);
