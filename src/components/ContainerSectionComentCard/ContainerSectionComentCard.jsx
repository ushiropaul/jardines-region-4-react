// src/components/ContainerSectionComentCard/ContainerSectionComentCard.jsx

import { useState, useEffect } from "react";
import SectionComentCard from "../SectionComentCard/SectionComentCard";
import { getComments, addComment } from "../../firebase/db";
import "./ContainerSectionComentCard.css";
import { Link } from "react-router-dom";

function ContainerSectionComentCard({ gardenID, onClose }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(1);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        // Obtener comentarios desde Firebase
        const fetchComments = async () => {
            const data = await getComments(gardenID);
            setComments(data);
        };
        fetchComments();
    }, [gardenID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Limpiar cualquier mensaje de error previo

        // Agregar comentario a Firebase
        const commentData = {
            gardenID,
            content: newComment,
            rating,
            isAnonymous,
        };

        try {
            await addComment(commentData);
            setNewComment("");
            setRating(1);
            setIsAnonymous(false);
            // Actualizar lista de comentarios
            const updatedComments = await getComments(gardenID);
            setComments(updatedComments);
        } catch (error) {
            if (error.message === "Usuario no autenticado") {
                setErrorMessage(
                        <p className="errorMessage">Debés estar registrado/a para poder comentar: <Link to="/registrarse">Registrarse</Link></p>
                );
            } else {
                setErrorMessage("Ocurrió un error al enviar el comentario. Inténtalo nuevamente.");
            }
        }
    };

    return (
        <div className="container-section-coment-card">
            <button className="close-button" onClick={onClose}></button>


            <SectionComentCard comments={comments} />


            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Explique su opinión sobre el jardín detalladamente."
                    required
                ></textarea>

                <div className="form-controls">
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                                {star} Estrella{star > 1 ? "s" : ""} ⭐
                            </option>
                        ))}
                    </select>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                        Comentar como anónimo
                    </label>
                </div>

                <button type="submit">Enviar</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra mensaje de error */}
        </div>
    );
}

export default ContainerSectionComentCard;
