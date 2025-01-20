// gardenCard


import React, { useState, useEffect } from "react";
import ContainerSectionComentCard from "../ContainerSectionComentCard/ContainerSectionComentCard";
import { getComments } from "../../firebase/db";
import "./GardenCard.css";

function GardenCard({ garden, onUpdateData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentsCount, setCommentsCount] = useState(garden.commentsCount || 0);
    const [averageRating, setAverageRating] = useState(garden.averageRating || 0);

    useEffect(() => {
        const fetchAndCalculateData = async () => {
            const comments = await getComments(garden.id);
    
            const validRatings = comments
                .map((comment) => comment.rating)
                .filter((rating) => rating >= 1 && rating <= 5);
    
            const newCommentsCount = comments.length;
            const newAverageRating =
                validRatings.length > 0
                    ? parseFloat(
                          (validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length).toFixed(1)
                      )
                    : 0;
    
            // Solo actualiza si los datos han cambiado
            if (
                newCommentsCount !== commentsCount ||
                newAverageRating !== averageRating
            ) {
                setCommentsCount(newCommentsCount);
                setAverageRating(newAverageRating);
    
                // Actualiza el componente padre solo si hay cambios
                onUpdateData({
                    id: garden.id,
                    commentsCount: newCommentsCount,
                    averageRating: newAverageRating,
                });
            }
        };
    
        fetchAndCalculateData();
    }, [garden.id]); // Nota: No necesitas incluir `onUpdateData` en las dependencias aquí.
    

    return (
        <>
            <div className="garden-card">
                <img src={garden.gardenImg} alt="" />
                <div>
                    <h3>Jardín {garden.gardenNumber}</h3>
                    <p>{commentsCount > 0 ? `${commentsCount} comentarios` : "Sin comentarios"}</p>
                    <span>Promedio: {averageRating || "Sin calificaciones"}</span>
                </div>
                <p>
                    <strong>Distrito:</strong> {garden.gardenDistrict}
                </p>
                <p>
                    <strong>Región:</strong> {garden.region}
                </p>
                <p>
                    <strong>Teléfono:</strong> {garden.gardenCelNum}
                </p>
                <a target="_blank" href={`${garden.gardenDirectionLink}`} rel="noopener noreferrer">
                    <p>
                        <strong>Dirección:</strong> {garden.gardenDirection}
                    </p>
                </a>
                <button className="buttonCard" onClick={() => setIsModalOpen(true)}>
                    Comentar
                </button>
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
