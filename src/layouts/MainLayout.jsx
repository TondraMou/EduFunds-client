import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer'

const MainLayout = () => {
  return (
    <div className='bg-white'>
      <Navbar></Navbar>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  )
}

export default MainLayout