import React, {useEffect} from 'react';
import {register} from "@teamhanko/hanko-elements";
import {useNavigate} from "react-router-dom";

function Home() {
    const HANKO_API: string = "http://localhost:8000";
    const navigate = useNavigate()

    useEffect(() => {
        register({shadow: true, injectStyles: true});
    }, []);

    const logout = () => {
        fetch(`${HANKO_API}/logout`, {
            credentials: "include",
        }).then(() => {
            navigate("/", {replace: true});
        })
        ;
    }

    return (
        <>
            <hanko-profile api={HANKO_API}/>
            <button onClick={logout}>Logout</button>
        </>
    );
}

export default Home;