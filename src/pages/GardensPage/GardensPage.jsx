// src/pages/GardensPage/GardensPage.jsx

import React, { useEffect, useState } from "react";
import { getGardens } from "./../../firebase/db"; 
import GardenCard from "../../components/GardenCard/GardenCard";
import "./GardensPage.css";

function GardensPage() {
    const [gardens, setGardens] = useState([]);
    const [filteredGardens, setFilteredGardens] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");

    useEffect(() => {
        // Obtener los datos de Firebase
        const fetchGardens = async () => {
            const data = await getGardens();
            setGardens(data);
        };
        fetchGardens();
    }, []);

    // Manejar el cambio de selección de región
    const handleRegionChange = (district) => {
        setSelectedRegion(district);
        if (district) {
            setFilteredGardens(
                gardens.filter((garden) =>
                    garden.gardenDistrict.toLowerCase() === district.toLowerCase()
                )
            );
        } else {
            setFilteredGardens([]);
        }
    };
    

    return (
        <div className="gardens-page">
            <h1>Jardines de Infantes</h1>
            <div className="region-selector">
                <button onClick={() => handleRegionChange("Quilmes")}>Quilmes</button>
                <button onClick={() => handleRegionChange("Varela")}>Varela</button>
                <button onClick={() => handleRegionChange("Berazategui")}>Berazategui</button>
                <button onClick={() => handleRegionChange("")}>Todos</button>
            </div>

            <div className="gardens-container">
                {(selectedRegion ? filteredGardens : gardens).map((garden) => (
                    <GardenCard key={garden.id} garden={garden} />
                ))}
            </div>
        </div>
    );
}

export default GardensPage;
