import React, { useState } from "react";
import ContainerSectionComentCard from "../ContainerSectionComentCard/ContainerSectionComentCard";
import "./GardenCard.css";

function GardenCard({ garden }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="garden-card">
                <img src={garden.gardenImg} alt="" />
                <div>
                    <h3>Jardín {garden.gardenNumber}</h3>
                    <p>{garden.commentsCount > 0 ? `${garden.commentsCount} comentarios` : "Sin comentarios"}</p>
                    <span>Promedio: {garden.averageRating || "Sin calificaciones"}</span>
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
                        <ContainerSectionComentCard gardenID={garden.id} onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}

export default GardenCard;
