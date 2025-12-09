import { HiOutlineUserGroup } from "react-icons/hi2";
import AddGuest from "../features/guests/AddGuest";
import GuestTable from "../features/guests/GuestTable";
import GuestTableOperations from "../features/guests/GuestTableOperation";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import { useDarkMode } from '../context/DarkModeContext';


function Guests() {
    const { isDarkMode } = useDarkMode();

    return (
        <>
            <MainHeading isDarkMode={isDarkMode}>
                <Heading as="h1">
                    <span>
                        <HiOutlineUserGroup size="31px" style={{ marginRight: '8px' }} />Guests
                    </span>
                </Heading>
                <AddGuest />
                <GuestTableOperations />
            </MainHeading>
            <GuestTable />
        </>
    );
}

export default Guests;