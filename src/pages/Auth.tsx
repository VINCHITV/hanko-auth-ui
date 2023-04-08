import React, {useCallback, useEffect} from 'react';
import {register} from "@teamhanko/hanko-elements";
import {useNavigate} from "react-router-dom";

function Auth() {
    const HANKO_API: string = "http://localhost:8000";
    const navigate = useNavigate();

    const redirectAfterLogin = useCallback(() => {
        navigate("/app", {replace: true});
    }, [navigate]);

    useEffect(() => {
        document.addEventListener("hankoAuthSuccess", redirectAfterLogin);
        register({shadow: true, injectStyles: true});

        return () =>
            document.removeEventListener("hankoAuthSuccess", redirectAfterLogin);
    }, [redirectAfterLogin]);

    return (
        <hanko-auth api={HANKO_API}/>
    );
}

export default Auth;