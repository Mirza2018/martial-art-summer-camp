import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/Firebase.config";


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    //**********Auth & Provider*******//
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()


    //******user and Lodding **********//
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    //***Login ***/
    const handleLogin = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    //***Register */
    const handleCreateUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    //**Google Login */
    const handleGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    //***LogOut */

    const handleLogOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    //** UpdateUser Profile */
    const handleUpdate = (name, url) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: url
        })
    }
    //**** Current user find */
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            ////////***Normal Authintacation */

            if (currentUser && currentUser.email) {
                const loggedUser = { email: currentUser.email }
                fetch("http://localhost:5000/jwt", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("user-access-token", data.token)
                        setLoading(false)
                    })
            }
            else {
                localStorage.removeItem("user-access-token")
            }







        })

        return () => {
            unSubscribe
        }
    }, [auth])

    //************Values***************
    const values = {
        user,
        loading,
        handleLogin,
        handleCreateUser,
        handleLogOut,
        handleGoogle,
        handleUpdate,

    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;