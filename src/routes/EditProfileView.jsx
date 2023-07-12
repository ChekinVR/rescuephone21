import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "../firebase/firebase";

export default function EditProfileView() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [profileUrl, setProfileUrl] = useState(null);
    const fileRef = useRef();


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

    function handleOpenFilePicker() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    function handleChangeFile(e) {
        const files = e.target.files;
        const fileReader = new FileReader();

        if (fileReader && files && files.length > 0) {
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async function () {
                const imageData = fileReader.result;

                const res = await setUserProfilePhoto(currentUser.uid, imageData);

                if (res) {
                    const tmpUser = {...currentUser};
                    tmpUser.profilePicture = res.metadata.fullPath;
                    await updateUser(tmpUser);
                    setCurrentUser({...tmpUser});
                    const url = await getProfilePhotoUrl(currentUser.profilePicture);
                    setProfileUrl(url);
                }
            }
        }
    }

    if (state != 2) {
        return <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotLoggedIn}></AuthProvider>
    }

    return (

        <DashboardWrapper>
            <div>
                <h2>Edit profile Info</h2>
                <div>
                    <div>
                        <img src={profileUrl} alt="" width={100} />
                    </div>
                    <div>
                        <button onClick={handleOpenFilePicker}>Elige tu nueva foto de perfil</button>
                        <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleChangeFile} />
                    </div>
                </div>
            </div>
        </DashboardWrapper>)
}