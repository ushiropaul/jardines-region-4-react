import { 
    collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc ,setDoc
} from "firebase/firestore";
import { db, auth } from "./config";


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

// Agregar comentario a un jardín
export const addComment = async ({ gardenID, content, rating, isAnonymous }) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuario no autenticado");

    const commentData = {
        gardenID,
        content,
        rating,
        isAnonymous,
        username: isAnonymous ? "Anónimo" : user.displayName || user.email,
        createdAt: new Date().toISOString(),
    };

    await addDoc(collection(db, "calificationGarden"), commentData);
};

// Obtener comentarios de un jardín
export const getComments = async (gardenID) => {
    const q = query(
        collection(db, "calificationGarden"),
        where("gardenID", "==", gardenID),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Eliminar comentario
export const deleteComment = async (commentID) => {
    await deleteDoc(doc(db, "calificationGarden", commentID));
};

// Agregar respuesta a un comentario
export const addReply = async ({ commentContent, gardenID, commentCreatedAt, content, isAnonymous }) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuario no autenticado");

    const replyData = {
        commentContent,  // Contenido del comentario original
        gardenID,  // ID del jardín donde se hizo el comentario
        commentCreatedAt,  // Marca de tiempo del comentario original
        content,  // Contenido de la respuesta
        isAnonymous,
        username: isAnonymous ? "Anónimo" : user.displayName || user.email,
        createdAt: new Date().toISOString(),
    };

    await addDoc(collection(db, "replysToComments"), replyData);
};

// Obtener respuestas a un comentario
export const getReplies = async ({ commentContent, gardenID, commentCreatedAt }) => {
    const q = query(
        collection(db, "replysToComments"),
        where("commentContent", "==", commentContent),
        where("gardenID", "==", gardenID),
        where("commentCreatedAt", "==", commentCreatedAt),
        orderBy("createdAt", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Eliminar respuesta a un comentario
export const deleteReply = async (replyID) => {
    await deleteDoc(doc(db, "replysToComments", replyID));
};


// Guardar datos adicionales del usuario en Firestore
export const saveUserData = async (userID, userData) => {
    await setDoc(doc(db, "usersData", userID), userData);
};



/**
 * Guardar un nuevo jardín en Firestore
 */
export const saveGarden = async (gardenData) => {
    // Validación de datos antes de guardar
    if (!gardenData.name || !gardenData.location) {
        throw new Error("El jardín debe tener nombre y ubicación.");
    }

    gardenData.createdAt = Timestamp.now(); // Agregamos un timestamp

    await addDoc(collection(db, "gardens"), gardenData);
};



/**
 * Obtener comentarios ordenados por fecha en Firestore
 */
export const getCommentsOrdered = async () => {
    const comments = [];
    const q = query(collection(db, "calificationGarden"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        comments.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    return comments;
};

