import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddScholarship from "../Pages/Dashboard/AddScholarship";
import AdminHome from "../Pages/Dashboard/AdminHome";
import ManageScholarship from "../Pages/Dashboard/ManageScholarship";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import AllUser from "../Pages/Dashboard/AllUser";
import PrivateRoute from "./PrivateRoute";
import Checkout from "../Pages/Checkout/Checkout";
import AdminAndModeratorRoute from "./AdminAndModeratorRoute";
import ManageAppliedScholarship from "../Pages/Dashboard/ManageAppliedScholarship";
import MyApplication from "../Pages/MyApplication/MyApplication";
import MyProfile from "../Pages/Dashboard/MyProfile";
import ManageReview from "../Pages/Dashboard/ManageReview";
import MyReviews from "../Pages/Dashboard/MyReviews";
import ErrorPage from "../Pages/ErrorPage";
import OnlyAdminRoute from "../Router/OnlyAdminRoute";
import ModeratorHome from "../Pages/Dashboard/ModeratorHome";
import AboutUs from "../Pages/AboutUs";
import Contact from "../Pages/Contact";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-Scholarship",
        element: <AllScholarship></AllScholarship>,
      },
      {
        path: "/scholarship-details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
    ],
  },
  // dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin
      {
        path: "admin-Home",
        element: (
          <OnlyAdminRoute>
            <AdminHome></AdminHome>
          </OnlyAdminRoute>
        ),
      },
      {
        path: "moderator-Home",
        element: <AdminAndModeratorRoute><ModeratorHome
        ></ModeratorHome></AdminAndModeratorRoute>,
      },
      {
        path: "add-scholarship",
        element: (
          <AdminAndModeratorRoute>
            <AddScholarship></AddScholarship>
          </AdminAndModeratorRoute>
        ),
      },
      {
        path: "manage-scholarship",
        element: (
          <AdminAndModeratorRoute>
            <ManageScholarship></ManageScholarship>,
          </AdminAndModeratorRoute>
        ),
      },
      {
        path: "all-user",
        element: (
          <OnlyAdminRoute>
            <AllUser></AllUser>
          </OnlyAdminRoute>
        ),
      },
      {
        path: "manage-applications",
        element: (
          <AdminAndModeratorRoute>
            <ManageAppliedScholarship></ManageAppliedScholarship>
          </AdminAndModeratorRoute>
        ),
      },
      {
        path: "my-application",
        element: (
          <PrivateRoute>
            <MyApplication></MyApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "all-review",
        element: (
          <AdminAndModeratorRoute>
            <ManageReview></ManageReview>
          </AdminAndModeratorRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
    ],
  },
]);