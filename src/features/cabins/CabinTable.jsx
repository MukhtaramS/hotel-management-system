import styled from "styled-components";
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useDarkMode } from "../../context/DarkModeContext";
import Pagination from "../../ui/Pagination";

const TableHeader = styled.div`
  display: grid;
    grid-template-columns: 0.42fr 1.1fr 1.25fr 0.6fr 1.25fr;
    padding: 10px;
    font-weight: 750; 
    text-transform: uppercase; 
    border-bottom: 2px solid #E5E7EB;
    font-size: 17px;
    background-color: ${({ isDarkMode }) => isDarkMode ? '#483D8B' : '#F9FAFB'}; 
  color: ${({ isDarkMode }) => isDarkMode ? '#e5e7eb' : '#374151'};
`;
const StyledTableWrapper = styled.div`
  margin-bottom: 20px; 
`;

function CabinTable() {
  const { isLoading, cabins, error, count } = useCabins();
  const [searchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  if (isLoading) return <Spinner />
  if (error) throw new Error("Couldn't load cabins");
  if (!cabins.length) return
  <Empty resourseName="cabins" />

  //1) for filter
  const filterValue = searchParams.get('discount') || "all";
  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "DeluxeDouble") filterCabins = cabins.filter(cabin => cabin.roomType === 'DeluxeDouble');
  if (filterValue === "TwinRoom") filterCabins = cabins.filter(cabin => cabin.roomType === 'TwinRoom');
  if (filterValue === "Double") filterCabins = cabins.filter(cabin => cabin.roomType === 'double');
  if (filterValue === "MountainView") filterCabins = cabins.filter(cabin => cabin.roomType === 'MountainView');


  //for Sorting
  const sortBy = searchParams.get('sortBy') || "startDate-asc"
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filterCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <StyledTableWrapper>

        <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' style={{ marginBottom: '1000px' }}>
          <TableHeader isDarkMode={isDarkMode}>
            <div>Picture</div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </TableHeader>
          <Table.Body
            //data={cabins}
            data={sortedCabins}
            render={(cabin, index) => (
              <CabinRow
                cabin={cabin}
                key={cabin.id}
                isLastRow={index === sortedCabins.length - 1}
              />
            )}
          />
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </StyledTableWrapper>

    </Menus >
  );
}
export default CabinTable;