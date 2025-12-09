{/*
import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
import Modal from "../../ui/Modal";

function AddBooking() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="booking-form">
                    <Button>New booking</Button>
                </Modal.Open>
                <Modal.Window name="booking-form">
                    <CreateBookingForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddBooking;
*/}
import Button from "../../ui/Button";
import { NavLink } from "react-router-dom";

function AddBooking() {
    return (
        <div>
            <NavLink to="/bookings/new">
                <Button>
                    + New Booking
                </Button>
            </NavLink>
        </div>
    );
}

export default AddBooking;