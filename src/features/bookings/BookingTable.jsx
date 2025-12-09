import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";


const TableHeader = styled.div`
  display: grid;
    grid-template-columns: 0.55fr 1.45fr 1.7fr 1fr 1fr;
    padding: 10px;
    font-weight: 600; 
    text-transform: uppercase; 
    border-bottom: 2px solid #E5E7EB;
    font-size: 17px;
    background-color: ${({ isDarkMode }) => isDarkMode ? '#483D8B' : '#F9FAFB'}; 
  color: ${({ isDarkMode }) => isDarkMode ? '#e5e7eb' : '#374151'};
`;

function BookingTable() {
  const { isDarkMode } = useDarkMode();

  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />

  if (!bookings.length) return (
    <Empty resourseName="bookings" />)


  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <TableHeader isDarkMode={isDarkMode}>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </TableHeader>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
