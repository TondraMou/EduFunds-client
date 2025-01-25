import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'
import AddScholarship from '../pages/Dashboard/Moderator/AddScholarship'

export const router = createBrowserRouter([
   {
    path: '/',
    element: <MainLayout></MainLayout>
   },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
        {
            path: 'add-scholarship',
            element: <AddScholarship></AddScholarship>
        }
    ]
  }
])