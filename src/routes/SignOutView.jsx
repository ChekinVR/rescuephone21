import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { logout } from "../firebase/firebase";

export default function SignOutView()
{
    const navigate = useNavigate();
    //Función si el usuario se encuentra logueado
    async function handleUserLoggedIn(user) {
        await logout();
    }

    //Función por si el usuario esta logueado pero no se encuentra registrado
    function handleUserNotRegistered(user) {
        navigate("/login")
    }

    //Función por si el usuario no esta logueado
    function handleUserNotLoggedIn(user) {
        navigate('/login')
    }



    return <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotLoggedIn}>

        
    </AuthProvider>
}