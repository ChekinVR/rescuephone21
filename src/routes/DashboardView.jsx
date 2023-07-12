import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";

export default function DashboardView() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});

    function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(2);
    }

    function handleUserNotRegistered(user) {
        navigate("/login")
    }

    function handleUserNotLoggedIn(user) {
        navigate('/login')
    }

    if (state == 0) {
        return (<AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotLoggedIn}>
            Loading...
        </AuthProvider>);
    }

    return( <DashboardWrapper>
        <div>
            <h1>Dashboard</h1>

            <form action="">
                <label htmlFor="title">Title</label>
                <input type="text" name="title"/>

                <label htmlFor="url">Url</label>
                <input type="text" name="url"/>

                <input type="submit" value="Create new link"/>
            </form>
        </div>
    </DashboardWrapper>);


}