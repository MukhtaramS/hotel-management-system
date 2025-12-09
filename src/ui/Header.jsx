import { useOpenSidebar } from "../hooks/useOpenSideBar"
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMenu } from "react-icons/hi";
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar"

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 20; // Higher than the sidebar to make sure it's on top
`;
function Header() {
    const { toggleSidebar } = useOpenSidebar();
    return (
        <StyledHeader>
            <ButtonIcon onClick={toggleSidebar}><HiOutlineMenu /></ButtonIcon>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    );
}
export default Header;


