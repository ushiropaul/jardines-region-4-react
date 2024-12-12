

// src/components/ComentCard/ComentCard.jsx

import "./ComentCard.css";

function ComentCard({ comment }) {
    return (
        <div className="coment-card">
            <h4>
                
                {comment.isAnonymous ? "Anónimo" : comment.username} - {comment.rating} ⭐
            </h4>
            <p>{comment.content}</p>
        </div>
    );
}

export default ComentCard;
