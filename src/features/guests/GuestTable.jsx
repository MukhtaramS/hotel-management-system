import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useGuests } from "./useGuests";
import GuestRow from "./GuestRow";
import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";

const TableHeader = styled.div`
  display: grid;
    grid-template-columns: 0.7fr 1.2fr 1.3fr 1.1fr 1.2fr 0.25fr 0.5fr;
    padding: 10px;
    font-weight: 600; 
    text-transform: uppercase; 
    border-bottom: 2px solid #E5E7EB;
    font-size: 17px;
    background-color: ${({ isDarkMode }) => isDarkMode ? '#483D8B' : '#F9FAFB'}; 
  color: ${({ isDarkMode }) => isDarkMode ? '#e5e7eb' : '#374151'};
`;

function GuestTable() {
    const { isDarkMode } = useDarkMode();

    const { guests, isLoading, count, error } = useGuests();

    if (isLoading) return <Spinner />;

    if (error) throw new Error("Couldn't load guests");

    if (!guests.length) return <Empty resourceName="guests" />;

    return (
        <Menus>
            <Table
                columns="0.6fr 1.2fr 1.4fr 1.1fr 1.2fr 0.1fr 0.5fr"
                mobilecolumns="1fr">
                <TableHeader isDarkMode={isDarkMode}>
                    <div>Id</div>
                    <div>Guest</div>
                    <div>email</div>
                    <div>Document</div>
                    <div>Nationality</div>
                    <div>Flag</div>
                </TableHeader>
                <Table.Body
                    data={guests}
                    render={(guest) => <GuestRow key={guest.id} guest={guest} />}
                />
                <Table.Footer>
                    <Pagination count={count} />
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default GuestTable;