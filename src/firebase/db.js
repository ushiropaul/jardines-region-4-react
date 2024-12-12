// src/firebase/db.js

import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./config";

// Obtener todos los jardines
export const getGardens = async () => {
    const gardens = [];
    const querySnapshot = await getDocs(collection(db, "gardens"));
    querySnapshot.forEach((doc) => {
        gardens.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    return gardens;
};

// Obtener comentarios por gardenID
export const getComments = async (gardenID) => {
    const comments = [];
    const q = query(collection(db, "calificationGarden"), where("gardenID", "==", gardenID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        comments.push(doc.data());
    });
    return comments;
};

// Agregar comentario
export const addComment = async ({ gardenID, content, rating, isAnonymous }) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuario no autenticado");

    // Asegurarse de que rating sea un número válido y esté en el rango (1-5)
    const ratingNumber = Number(rating);  // Convertir a número
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
        throw new Error("El rating debe ser un número entre 1 y 5.");
    }

    const commentData = {
        gardenID,
        content,
        rating: ratingNumber, // Guardar rating como número
        isAnonymous,
        username: isAnonymous ? "Anónimo" : user.displayName || user.email,
        createdAt: new Date().toISOString(),
    };

    // Agregar el comentario a Firestore
    await addDoc(collection(db, "calificationGarden"), commentData);
};
