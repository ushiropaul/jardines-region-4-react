// src/components/GardenCard/GardenCard.jsx
import React, { useState, useEffect } from "react";
import ContainerSectionComentCard from "../ContainerSectionComentCard/ContainerSectionComentCard";
import { getComments } from "../../firebase/db";
import "./GardenCard.css";

function GardenCard({ garden }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [averageRating, setAverageRating] = useState(null);

    useEffect(() => {
        // Obtener comentarios y calcular promedio de ratings válidos
        const fetchAndCalculateAverage = async () => {
            const comments = await getComments(garden.id);

            if (comments.length > 0) {
                // Filtrar valores válidos (entre 1 y 5)
                const validRatings = comments
                    .map(comment => comment.rating)
                    .filter(rating => rating >= 1 && rating <= 5);

                if (validRatings.length > 0) {
                    // Calcular el promedio normalizado
                    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
                    const average = totalRating / validRatings.length;

                    // Redondear y limitar el rango entre 1 y 5
                    const normalizedAverage = Math.min(5, Math.max(1, average));
                    setAverageRating(normalizedAverage.toFixed(1)); // Redondear a 1 decimal
                } else {
                    setAverageRating("Sin ratings");
                }
            } else {
                setAverageRating("Sin ratings");
            }
        };

        fetchAndCalculateAverage();
    }, [garden.id]);

    return (
        <>
            <div className="garden-card">
                <img src={garden.gardenImg} alt="" />
                <div>
                    <h3>
                        Jardín {garden.gardenNumber}{" "}
                    </h3>
                    <span>{averageRating ? `Calificación: ${averageRating} de promedio` : ""}</span>
                </div>
                <p><strong>Distrito:</strong> {garden.gardenDistrict}</p>
                <p><strong>Región:</strong> {garden.region}</p>
                <p><strong>Teléfono:</strong> {garden.gardenCelNum}</p>
                <a target="_blank" href={`${garden.gardenDirectionLink}`} rel="noopener noreferrer">
                    <p><strong>Dirección:</strong> {garden.gardenDirection}</p>
                </a>
                <button className="buttonCard" onClick={() => setIsModalOpen(true)}>Comentar</button>
            </div>

            {isModalOpen && (
                <div className="modal-background" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setIsModalOpen(false)}>
                            ✖
                        </button>
                        <ContainerSectionComentCard
                            gardenID={garden.id}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default GardenCard;
