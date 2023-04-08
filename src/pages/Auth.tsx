import React, {useEffect} from "react";
import Navbar from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {PasscodeInput} from "@/components/PasscodeInput";
import {EmailInput} from "@/components/EmailInput";
import {openModal} from "@/utils/modal";
import {SavePasskeyModal} from "@/components/SavePasskeyModal";

function Auth() {
    const navigate = useNavigate();
    const modalId: string = 'savePasskeyModal';

    const {
        authInit,
        finalisePasskeyAuthentication,
        registerWithPasskey,
        loginWithPasskey,
        isAuthComplete,
        isPasscodeRequired,
        canSavePasskey,
        userId,
        email
    } = useAuth();

    useEffect(() => {
        if (isAuthComplete && !canSavePasskey) {
            navigate("/app", {replace: true});
        }
    }, [isAuthComplete, canSavePasskey]);

    useEffect(() => {
        if (canSavePasskey) {
            openModal(modalId);
        }
    }, [canSavePasskey]);

    return (
        <>
            <Navbar title="Authentication using SDK"/>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    isPasscodeRequired ? finalisePasskeyAuthentication(userId, email, event) : authInit(event);
                }}
                className="flex h-72 justify-center"
            >
                <div className="flex items-start flex-col justify-center gap-4">
                    {isPasscodeRequired ? <PasscodeInput/> : <EmailInput/>}
                    <div className="flex flex-col items-center w-full gap-4">
                        <button type="submit"
                                className="btn btn-primary w-full">{isPasscodeRequired ? 'Submit' : 'Continue'}</button>
                        {!isPasscodeRequired ?
                            <>
                                <div className="divider">OR</div>
                                <button onClick={() => {
                                    loginWithPasskey()
                                }} type="button" className="btn w-full">Sign in with passkey
                                </button>
                            </>
                            : null}
                    </div>

                </div>
            </form>
            <SavePasskeyModal
                body={
                    <div className="flex flex-col items-center gap-8">
                        <p className="text-sm">By saving a passkey into your device you won't need passcode further in
                            this
                            device.</p>
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => {
                                registerWithPasskey()
                            }}
                        >
                            Save Passkey
                        </button>
                    </div>
                }
                title="Save a passkey?"
                modalId={modalId}
                onClose={() => {
                    if (isAuthComplete) {
                        navigate("/app", {replace: true});
                    }
                }}/>
        </>
    );
}

export default Auth;
