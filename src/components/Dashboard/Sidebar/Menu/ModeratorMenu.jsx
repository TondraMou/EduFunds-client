import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md';
import MenuItem from './MenuItem';

const ModeratorMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Scholarships'
        address='manage-scholarships'
      />
      <MenuItem
        icon={MdHomeWork}
        label='All Reviews'
        address='all-reviews'
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='All Applied Scholarships'
        address='all-applied-scholarships'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Scholarship'
        address='add-scholarship'
      />
    </>
  );
};

export default ModeratorMenu;