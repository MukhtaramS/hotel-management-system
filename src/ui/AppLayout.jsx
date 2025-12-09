import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useOpenSidebar } from "../hooks/useOpenSideBar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-areas: 
    "header"
    "main";
  grid-template-rows: auto 1fr;
  height: 100vh;

  aside {
    position: fixed;
    top: calc(100% - (100vh - 60px));
    left: ${props => props.isSidebarOpen ? '0' : '-26rem'}; // Adjust as needed
    width: 26rem; // Sidebar width
    height: 100%;
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    transition: left 0.5s ease-in-out;
    z-index: 10; // Ensure sidebar is on top
  }

  header {
    grid-area: header;
    position: fixed; // Changed from 'sticky' to 'fixed' to remove any unwanted space
    top: 0;
    z-index: 20; // Ensure header is above the main content but below the sidebar
    background-color: var(--color-grey-0); // Match the background or make it transparent
    width: 100%; // Ensure it spans the full width
    height: 60px; // Set a fixed height for the header
  }

  main {
    grid-area: main;
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: auto;
    margin-top: 60px; // Ensure this matches the height of your header to prevent content overlap
    transition: margin-top 0.3s ease-out; // Optional: add a transition for smoother layout shifts
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const { isSidebarOpen } = useOpenSidebar();
  return (
    <StyledAppLayout isSidebarOpen={isSidebarOpen}>
      <aside>
        <Sidebar />
      </aside>
      <header>
        <Header />
      </header>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
