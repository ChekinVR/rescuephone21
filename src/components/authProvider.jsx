import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, getUserInfo, registerNewUser, userExist } from "../firebase/firebase";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered }) {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExist(user.uid);
                if (isRegistered) {
                    console.log("you puto");
                    const userInfo = await getUserInfo(user.uid);
                    if(userInfo.processCompleted == true){
                        onUserLoggedIn(userInfo);
                    }else{
                        onUserNotRegistered(userInfo);
                    }
                } else {
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: '',
                        username: '',
                        mail: '',
                        birthday: '',
                        gender: '',
                        address: '',
                        password: '',
                        phoneNumber: '',
                        modDevice: '',
                        processCompleted: false,
                    });
                    onUserNotRegistered(user);
                }
                console.log(user.displayName);
            } else {
                onUserNotLoggedIn();
            }

        });
    }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);
    return <div>{children}</div>
}