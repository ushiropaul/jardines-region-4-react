
// gardenPage


import React, { useEffect, useState } from "react";
import { getGardens } from "./../../firebase/db";
import GardenCard from "../../components/GardenCard/GardenCard";
import "./GardensPage.css";


function GardensPage() {
    const [gardens, setGardens] = useState([]);
    const [gardensData, setGardensData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [filterBy, setFilterBy] = useState("none");

    useEffect(() => {
        const fetchGardens = async () => {
            const data = await getGardens();
    
            const initializedData = data.map((garden) => ({
                ...garden,
                commentsCount: garden.commentsCount || 0,
                averageRating: garden.ratings && garden.ratings.length > 0
                    ? garden.ratings.reduce((sum, rating) => sum + rating, 0) / garden.ratings.length
                    : 0,
            }));
    
            console.log("Datos iniciales de jardines:", initializedData);
    
            setGardens(initializedData);
            setGardensData(initializedData);
        };
    
        fetchGardens();
    }, []);
    
    

    const handleRegionChange = (district) => {
        setSelectedRegion(district);

        if (district) {
            setGardensData(gardens.filter((garden) => garden.gardenDistrict === district));
        } else {
            setGardensData(gardens);
        }
    };

    const handleFilterChange = (filterType) => {
        setFilterBy(filterType);
    
        let sortedGardens = [...gardensData]; // Copia del estado actual.
    
        switch (filterType) {
            case "comments-desc":
                sortedGardens.sort((a, b) => b.commentsCount - a.commentsCount);
                break;
            case "comments-asc":
                sortedGardens.sort((a, b) => a.commentsCount - b.commentsCount);
                break;
            case "rating-desc":
                sortedGardens.sort((a, b) => b.averageRating - a.averageRating);
                break;
            case "rating-asc":
                sortedGardens.sort((a, b) => a.averageRating - b.averageRating);
                break;
            default:
                sortedGardens = [...gardens]; // Restaurar a datos originales.
                break;
        }
    
        console.log(`Jardines después de aplicar filtro (${filterType}):`, sortedGardens);
    
        setGardensData([...sortedGardens]); // Fuerza una nueva referencia para asegurar la re-renderización.
    };
    
    
    

    const handleUpdateGardenData = (updatedData) => {
        const updatedGardens = gardens.map((garden) =>
            garden.id === updatedData.id
                ? { ...garden, commentsCount: updatedData.commentsCount, averageRating: updatedData.averageRating }
                : garden
        );
    
        console.log("Datos actualizados:", updatedGardens);
        setGardens(updatedGardens);
        setGardensData(updatedGardens);
    };
    

    return (
        <div className="gardens-page">
            <h1>Jardines de Infantes</h1>

            {/* Región */}
            <div className="region-selector">
                <button onClick={() => handleRegionChange("Quilmes")}>Quilmes</button>
                <button onClick={() => handleRegionChange("Varela")}>Varela</button>
                <button onClick={() => handleRegionChange("Berazategui")}>Berazategui</button>
                <button onClick={() => handleRegionChange("")}>Todos</button>
            </div>

            {/* Filtros */}
            <div className="filter-selector">
                <button onClick={() => handleFilterChange("comments-asc")}>
                    Más Comentarios
                </button>
                <button onClick={() => handleFilterChange("comments-desc")}>
                    Menos Comentarios
                </button>
                <button onClick={() => handleFilterChange("rating-asc")}>
                    Promedio (Mayor a Menor)
                </button>
                <button onClick={() => handleFilterChange("rating-desc")}>
                    Promedio (Menor a Mayor)
                </button>
            </div>

            {/* Jardines */}
            <div className="gardens-container">
                {gardensData.map((garden) => (
                    <GardenCard
                        key={garden.id}
                        garden={garden}
                        onUpdateData={handleUpdateGardenData}
                    />
                ))}
            </div>
        </div>
    );
}

export default GardensPage;
