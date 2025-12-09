import Heading from "../ui/Heading";
import BookingTable from "../features/bookings/BookingTable"
import BookingTableOperations from "../features/bookings/BookingTableOperations"
import AddBooking from "../features/bookings/AddBooking";
import MainHeading from "../ui/MainHeading";
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { useDarkMode } from '../context/DarkModeContext';


function Bookings() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <MainHeading isDarkMode={isDarkMode}>
        <Heading as="h1">
          <HiOutlineCalendarDays size="31px" style={{ marginRight: '8px' }} /><span>All bookings</span>
        </Heading>
        <AddBooking />
        <BookingTableOperations />
      </MainHeading>
      <BookingTable />
    </>
  );
}

export default Bookings;
