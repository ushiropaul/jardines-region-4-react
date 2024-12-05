
import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";





export const authContext = createContext()


export const useAuth = () => {
    const context = useContext(authContext)
    return context
}


export function AuthProvider({ children }){

    const signup = (email, password, FirstName, LastName) => {
        createUserWithEmailAndPassword(auth, email, password, FirstName, LastName)
        console.log(email, password, FirstName, LastName);
    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        console.log(email, password)
    }

    return(
        <authContext.Provider value={{signup, login}}>
            {children}
        </authContext.Provider>
    )
}





























