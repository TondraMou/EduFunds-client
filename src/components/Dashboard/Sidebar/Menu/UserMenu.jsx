
import { MdOutlineAssignment, MdRateReview } from 'react-icons/md';
import MenuItem from './MenuItem';

const DashboardMenu = () => {
  return (
    <>

      {/* My Application */}
      <MenuItem 
        icon={MdOutlineAssignment} 
        label="My Application" 
        address="my-application" 
      />

      {/* My Reviews */}
      <MenuItem 
        icon={MdRateReview} 
        label="My Reviews" 
        address="my-reviews" 
      />
    </>
  );
};

export default DashboardMenu;