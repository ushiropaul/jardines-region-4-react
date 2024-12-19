import { useState, useEffect } from "react";
import SectionComentCard from "../SectionComentCard/SectionComentCard";
import { getComments, addComment } from "../../firebase/db";
import { useAuth } from "../../context/AuthContext";
import "./ContainerSectionComentCard.css";
import { Link } from "react-router-dom";

function ContainerSectionComentCard({ gardenID, onClose }) {
    const { user } = useAuth(); // Acceso al usuario autenticado
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(1);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            const data = await getComments(gardenID);
            setComments(data);
        };
        fetchComments();
    }, [gardenID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!user) {
            setErrorMessage(
                <p className="errorMessage">
                    Debés estar registrado/a para comentar:{" "}
                    <Link to="/registrarse">Registrarse</Link>
                </p>
            );
            return;
        }

        const commentData = {
            gardenID,
            fullName: isAnonymous ? "Anónimo" : user.fullName,
            email: isAnonymous ? "anonimo@example.com" : user.email,
            content: newComment,
            rating,
            isAnonymous,
        };

        try {
            await addComment(commentData);
            setNewComment("");
            setRating(1);
            setIsAnonymous(false);
            const updatedComments = await getComments(gardenID);
            setComments(updatedComments);
        } catch (error) {
            setErrorMessage("Ocurrió un error al enviar el comentario. Inténtalo nuevamente.");
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default ContainerSectionComentCard;
