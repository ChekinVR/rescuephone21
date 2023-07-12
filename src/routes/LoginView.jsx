import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, userExist } from "../firebase/firebase";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";




export default function LoginView() {

    const navigate = useNavigate();
    // const [currentUser, setCurrentUser] = useState(null);
    /*
    State
    0: Inicializado
    1: loading
    2: login completo
    3: login sin registro
    4: no hay nadie logueado
    5: ya existe el username
    6: Nuevo username, click para continuar
    */
    const [state, setCurrentState] = useState(0);

    // useEffect(() => {
    //     setCurrentState(1);
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             const isRegistered = await userExist(user.uid);
    //             if (isRegistered == false) {
    //                 //TODO: redirigir a dashboard
    //                 navigate('/dashboard');
    //                 setCurrentState(2);
    //             } else {
    //                 //TODO: redirigir a choose username
    //                 navigate('/choose-username');
    //                 setCurrentState(3);
    //             }
    //             console.log(user.displayName);
    //         } else {
    //             setCurrentState(4);
    //             console.log('No hay nadie autenticado...');
    //         }

    //     });
    // }, [navigate]);


    async function handleOnClick() {
        const googleprovider = new GoogleAuthProvider();
        await signInWithGoogle(googleprovider);
        async function signInWithGoogle(googleprovider) {
            try {
                const res = await signInWithPopup(auth, googleprovider);
                console.log(res)
            } catch (error) {
                console.error(error);
            }
        }
    }

    function handleUserLoggedIn(user){
        navigate('/dashboard');
    }

    function handleUserNotRegistered(user){
        navigate('/choose-username');
    }

    function handleUserNotLoggedIn(user){
        setCurrentState(4);
    }
    

    // if (state == 2) {
    //     return <div>Estas autenticado y registrado</div>
    // }

    // if (state == 3) {
    //      return <div>Estas autenticado pero no registrado</div>
    // }

    if (state == 4) {
        return <div>
            <button onClick={handleOnClick}>
                Login with Google
            </button>
        </div>;
    }
    if (state == 5) {
        return <div>
            <button onClick={handleOnClick}>
                Login with Google
            </button>
        </div>;
    }

    return <AuthProvider 
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    ><div>Loading....</div>
    </AuthProvider>
}