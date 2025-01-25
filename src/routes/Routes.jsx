import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'
import AddScholarship from '../pages/Dashboard/Moderator/AddScholarship'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import ManageScholarships from '../components/ManageScholarships'
import Home from '../pages/Home'

export const router = createBrowserRouter([
   {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <SignUp></SignUp>
        },
        {
            path: '/',
            element: <Home></Home>
        }
    ]
   },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
        {
            path: 'add-scholarship',
            element: <AddScholarship></AddScholarship>
        },
        {
            path: 'manage-scholarships',
            element: <ManageScholarships></ManageScholarships>
        }
    ]
  }
])