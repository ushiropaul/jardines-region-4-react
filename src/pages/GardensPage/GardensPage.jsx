import React, { useEffect, useState } from "react";
import { getGardens, getComments } from "./../../firebase/db";
import GardenCard from "../../components/GardenCard/GardenCard";
import SearchGardens from "../../components/SearchGardens/SearchGardens";
import "./GardensPage.css";

function GardensPage() {
    const [gardens, setGardens] = useState([]);
    const [gardensData, setGardensData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [filterBy, setFilterBy] = useState("none");
    const [starFilters, setStarFilters] = useState([]);

    const fetchGardensWithRatings = async () => {
        const data = await getGardens();
    
        // Agrega ratings y comentarios
        const updatedData = await Promise.all(
            data.map(async (garden) => {
                const comments = await getComments(garden.id);
    
                const validRatings = comments
                    .map((comment) => comment.rating)
                    .filter((rating) => rating >= 1 && rating <= 5);
    
                return {
                    ...garden,
                    commentsCount: comments.length,
                    averageRating: validRatings.length
                        ? parseFloat(
                              (validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length).toFixed(1)
                          )
                        : 0,
                };
            })
        );
    
        // Ordenar jardines: Primero por distrito (alfabéticamente), luego por número de jardín (ascendente)
        updatedData.sort((a, b) => {
            if (a.gardenDistrict < b.gardenDistrict) return -1;
            if (a.gardenDistrict > b.gardenDistrict) return 1;
            return a.gardenNumber - b.gardenNumber;
        });
    
        setGardens(updatedData);
        setGardensData(updatedData);
    };
    

    useEffect(() => {
        fetchGardensWithRatings();
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

        let sortedGardens = [...gardensData];

        switch (filterType) {
            case "comments-desc":
                sortedGardens.sort((a, b) => b.commentsCount - a.commentsCount);
                break;
            case "comments-asc":
                sortedGardens.sort((a, b) => a.commentsCount - b.commentsCount);
                break;
            default:
                sortedGardens = [...gardens];
                break;
        }

        setGardensData(sortedGardens);
    };

    const handleStarFilterChange = (star) => {
        const updatedFilters = starFilters.includes(star)
            ? starFilters.filter((s) => s !== star) // Quita el filtro si ya está seleccionado
            : [...starFilters, star]; // Agrega el filtro si no está seleccionado

        setStarFilters(updatedFilters);

        if (updatedFilters.length > 0) {
            const filteredGardens = gardens.filter((garden) =>
                updatedFilters.includes(Math.floor(garden.averageRating))
            );
            setGardensData(filteredGardens);
        } else {
            setGardensData(gardens);
        }
    };

    const handleSearchResults = (filteredGardens) => {
        setGardensData(filteredGardens);
    };

    return (
        <div className="gardens-page">
            <h1>Jardines de Infantes</h1>

            <div className="hover-container">
                <SearchGardens className="hover-button" gardens={gardens} onSearchResults={handleSearchResults} />
                <div className="tooltip">Podés buscar por número de jardín, por dirección, <br /> por promedio de calificación, por teléfono, etc...</div>
            </div>
        


            <div className="region-selector">
                <button onClick={() => handleRegionChange("Quilmes")}>Quilmes</button>
                <button onClick={() => handleRegionChange("Varela")}>Varela</button>
                <button onClick={() => handleRegionChange("Berazategui")}>Berazategui</button>
                <button onClick={() => handleRegionChange("")}>Todos</button>
            </div>

            <div className="filter-selector">
                <button onClick={() => handleFilterChange("comments-asc")}>Menos Comentarios</button>
                <button onClick={() => handleFilterChange("comments-desc")}>Más Comentarios</button>
            </div>

            <div className="range-stars-filter">
                {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star}>
                        <input
                            type="checkbox"
                            value={star}
                            checked={starFilters.includes(star)}
                            onChange={() => handleStarFilterChange(star)}
                        />
                        {star} estrella{star > 1 ? "s" : ""}
                    </label>
                ))}
            </div>

            <div className="gardens-container">
                {gardensData.map((garden) => (
                    <GardenCard key={garden.id} garden={garden} />
                ))}
            </div>
        </div>
    );
}

export default GardensPage;
