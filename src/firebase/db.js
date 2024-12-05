import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

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
