import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'

export const router = createBrowserRouter([
   {
    path: '/',
    element: <MainLayout></MainLayout>
   },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>
  }
])