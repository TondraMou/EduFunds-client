import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='bg-white'>
      
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      
    </div>
  )
}

export default MainLayout