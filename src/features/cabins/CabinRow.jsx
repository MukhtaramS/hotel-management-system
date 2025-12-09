import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers"
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash, HiEye, HiArrowDownOnSquareStack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom"
import CabinDetails from "./CabinDetails";

{/**
  const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
<Modal.Open opens="cabin-details">
                <Menus.Button icon={<HiEye />}>See Details</Menus.Button>
              </Modal.Open>

              <Menus.Button
                icon={<HiArrowDownOnSquareStack />}
                onClick={() => navigate(`/bookings/new/${cabinId}`)}
                disabled={isCreating}
              >
                Book Cabin
              </Menus.Button>
*/
}
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const StyledMenuList = styled(Menus.List)`
  ${({ isLastRow }) => isLastRow && `
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    z-index: 1;
  `}
`;


const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



function CabinRow({ cabin, isLastRow, }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin()
  const navigate = useNavigate();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity, regularPrice, discount, image, description
    })
  }

  const menuTopStyles = isLastRow
    ? { position: 'absolute', top: 0, left: 0, zIndex: 1 }
    : {};
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )
      }
      <div>
        <Modal>

          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <StyledMenuList style={menuTopStyles} isLastRow={isLastRow} id={cabinId}>

              <Modal.Open opens="cabin-details">
                <Menus.Button icon={<HiEye />}>See Details</Menus.Button>
              </Modal.Open>

              <Menus.Button
                icon={<HiArrowDownOnSquareStack />}
                onClick={() => navigate(`/bookings/new/${cabinId}`)}
                disabled={isCreating}
              >
                Book Cabin
              </Menus.Button>

              <Menus.Button icon={<HiSquare2Stack />}
                onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>
                  Delete
                </Menus.Button>
              </Modal.Open>

            </StyledMenuList>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="cabin-details">
              <CabinDetails cabin={cabin} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;