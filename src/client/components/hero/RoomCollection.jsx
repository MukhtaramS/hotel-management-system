import { useNavigate } from "react-router-dom";
import { roomTypes } from "../../assets/data/data"


export const RoomCollection = () => {
    const navigate = useNavigate();

    const handleViewCollection = () => {
        navigate("/rooms");
        window.scrollTo(0, 0);
    }
    const handleBookRoom = (roomId) => {
        navigate(`/room-details/${roomId}`);
        window.scrollTo(0, 0);
    };
    return (
        <section className="collection-section">
            <div className="collection-banner">
                <h1>The Collection</h1>
                <p>Welcome to The Collection of some the best accommodation in Derry—our opulent suite of exclusive rooms inspired by the city itself.</p>
                <button className="view-collection-btn" onClick={handleViewCollection}>View the Collection</button>
            </div>
            <div className="collection-container">
                {roomTypes.map(room => (
                    <div key={room.title} className="room-type-card">
                        <img src={room.imageUrl} alt={room.title} className="room-type-image" />
                        <div className="room-type-content">
                            <h3 className="room-type-title">{room.title}</h3>
                            <p className="room-type-description">{room.description}</p>
                            <button className="btn btn-primary" onClick={() => handleBookRoom(room.id)}>{room.buttonText}</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
