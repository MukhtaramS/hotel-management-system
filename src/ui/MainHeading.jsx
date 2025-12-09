import styled from 'styled-components';



const MainHeading = styled.div`
  padding: 24px 32px;
  margin-bottom: 24px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size:2rem;
  font-weight: 600;
  background-color: ${({ isDarkMode }) => isDarkMode ? '#483D8B' : 'lightblue'};
  color: ${({ isDarkMode }) => isDarkMode ? '#e5e7eb' : '#374151'};


`;

export default MainHeading;
