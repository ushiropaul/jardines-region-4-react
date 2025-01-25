// Buscador.js

import React, { useState } from "react";
import "./SearchGardens.css";

function SearchGardens({ gardens, onSearchResults }) {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);

        const filteredGardens = gardens.filter((garden) =>
            Object.values(garden)
                .join(" ") // Combina todos los valores del objeto
                .toLowerCase()
                .includes(value) // Comprueba si el texto coincide
        );

        onSearchResults(filteredGardens);
    };

    return (
        <div className="buscador">
            <input
                type="text"
                placeholder="Buscar jardines..."
                value={searchText}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default SearchGardens;
