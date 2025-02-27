
// src/components/SectionComentCard/SectionComentCard.jsx
import React from "react";
import ComentCard from "../ComentCard/ComentCard";
import "./SectionComentCard.css";

function SectionComentCard({ comments }) {
    return (
        <div className="section-coment-card">
            {comments.map((comment, index) => (
                <ComentCard key={index} comment={comment} />
            ))}
        </div>
    );
}

export default SectionComentCard;
