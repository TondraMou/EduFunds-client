import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'

export const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>
  }
])