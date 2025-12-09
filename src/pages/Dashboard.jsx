import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import { HiOutlineHome } from 'react-icons/hi2'
import { useDarkMode } from '../context/DarkModeContext';


function Dashboard() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <MainHeading isDarkMode={isDarkMode}>
        <Heading as="h1">
          <HiOutlineHome size="31px" style={{ marginRight: '8px' }} /><span>Dashboard</span>
        </Heading>
        <DashboardFilter />
      </MainHeading>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
