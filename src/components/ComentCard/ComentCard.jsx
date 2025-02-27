import { useState, useEffect } from "react";
import { getReplies, addReply } from "../../firebase/db";
import "./ComentCard.css";

function ComentCard({ comment }) {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [replyText, setReplyText] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);

    useEffect(() => {
        if (showReplies) {
            const fetchReplies = async () => {
                const data = await getReplies({
                    commentContent: comment.content,
                    gardenID: comment.gardenID,
                    commentCreatedAt: comment.createdAt
                });
                setReplies(data);
            };
            fetchReplies();
        }
    }, [showReplies, comment]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const replyData = {
            commentContent: comment.content,
            gardenID: comment.gardenID,
            commentCreatedAt: comment.createdAt,
            content: replyText,
            isAnonymous,
        };

        await addReply(replyData);
        setReplyText("");
        setShowReplyForm(false);

// Recargar respuestas
        const updatedReplies = await getReplies({
            commentContent: comment.content,
            gardenID: comment.gardenID,
            commentCreatedAt: comment.createdAt
        });
        setReplies(updatedReplies);
    };

    return (
        <div className="coment-card">
            <h4>{comment.isAnonymous ? "Anónimo" : comment.username} - Calificación: {comment.rating} ⭐</h4>
            <p>{comment.content}</p>

            <div className="containerBtnsReplys">
                <button className="btnDoAReply" onClick={() => setShowReplyForm(!showReplyForm)}>Responder</button>
                <button className="btnShowReplys" onClick={() => setShowReplies(!showReplies)}>
                    {showReplies ? "Ocultar respuestas" : "Ver respuestas"}
                </button>
            </div>

            {showReplyForm && (
                <form onSubmit={handleReplySubmit} className="reply-form">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Escribe una respuesta..."
                        required
                    ></textarea>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={() => setIsAnonymous(!isAnonymous)}
                        />
                        Responder de forma anónima
                    </label>
                    <button type="submit">Enviar respuesta</button>
                </form>
            )}

            {showReplies && (
                <div className="replies">
                    {replies.length > 0 ? (
                        replies.map((reply) => (
                            <div key={reply.id} className="reply">
                                <h5>{reply.isAnonymous ? "Anónimo" : reply.username}</h5>
                                <p>{reply.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay respuestas aún.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ComentCard;
