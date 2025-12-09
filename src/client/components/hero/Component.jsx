
import { amenitiesList } from "../../assets/data/data"

export const Component = () => {
    return (
        <div className="amenities-container">
            <h1>Amenities & Services</h1>
            <p>Welcome to a stay defined by comfort and convenience with an array of top-notch amenities at your disposal.</p>
            {amenitiesList.map((section, index) => (
                <div key={index} className="amenities-section">
                    <h2>{section.category}</h2>
                    <ul>
                        {section.items.map(item => (
                            <li key={item.name} className="amenity-item">
                                <strong>{item.name}:</strong> {item.description}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
