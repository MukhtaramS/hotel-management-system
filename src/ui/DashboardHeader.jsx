import styled from 'styled-components';

const DashboardHeader = styled.div`
  padding: 24px 32px;
  margin-bottom: 24px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size:2rem;
  font-weight: 600;
  background-color: ${({ isDarkMode }) => isDarkMode ? '#483D8B' : 'lightblue'};
`;

export default DashboardHeader;
