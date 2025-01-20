import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
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

    const ratingNumber = Number(rating); // Convertir a número
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
        throw new Error("El rating debe ser un número entre 1 y 5.");
    }

    const commentData = {
        gardenID,
        content,
        rating: ratingNumber,
        isAnonymous,
        username: isAnonymous ? "Anónimo" : user.displayName || user.email,
        createdAt: new Date().toISOString(),
    };

    await addDoc(collection(db, "calificationGarden"), commentData);
};

// Eliminar un comentario
export const deleteComment = async (commentID) => {
    try {
        const commentRef = doc(db, "calificationGarden", commentID);
        await deleteDoc(commentRef);
    } catch (error) {
        throw new Error("Error al eliminar el comentario: " + error.message);
    }
};

// Guardar datos adicionales del usuario en usersData
export const saveUserData = async (uid, userData) => {
    try {
        const userRef = doc(db, "usersData", uid);
        await setDoc(userRef, userData);
    } catch (error) {
        throw new Error("Error al guardar datos adicionales del usuario: " + error.message);
    }
};
