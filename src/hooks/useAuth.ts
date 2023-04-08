import {
    ConflictError,
    InvalidPasscodeError,
    UnauthorizedError,
    User,
    UserInfo,
    WebauthnRequestCancelledError
} from "@teamhanko/hanko-frontend-sdk";
import {SyntheticEvent, useCallback, useEffect, useState} from "react";
import UserService from "@/services/user";
import WebauthService from "@/services/webauth";
import {PasscodeService} from "@/services/passcode";
import HankoService from "@/services/hanko";

const useAuth = (): {
    authInit: typeof authInit;
    loginWithPasskey: typeof loginWithPasskey;
    initiatePasskeyAuthentication: typeof initiatePasskeyAuthentication;
    finalisePasskeyAuthentication: typeof finalisePasskeyAuthentication;
    registerWithPasskey: typeof registerWithPasskey;
    isPasscodeRequired: boolean;
    isAuthComplete: boolean;
    canSavePasskey: boolean;
    userId: string;
    email: string;
} => {
    const userService = new UserService();
    const webauthService = new WebauthService();
    const passcodeService = new PasscodeService();
    const [isPasscodeRequired, setIsPasscodeRequired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthComplete, setIsAuthComplete] = useState(false);
    const [canSavePasskey, setCanSavePasskey] = useState(false);
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    const initiatePasskeyAuthentication = async (userId: string, emailId: string) => {
        try {
            await passcodeService.initialise({userId, emailId});
            setIsPasscodeRequired(true);
        } catch (error) {
            alert(error instanceof UnauthorizedError ? 'You are unauthorized' : 'Internal error');
            setIsPasscodeRequired(false);
        }
    }

    const finalisePasskeyAuthentication = useCallback(
        async (userId: string, email: string, event: SyntheticEvent) => {
            event.preventDefault();
            const {code} = event.target as typeof event.target & {
                code: { value: string };
            };
            try {
                await passcodeService.finalise({userId, code: code.value});
                const userInfo = await userService.getUserInfo(email);

                if (!userInfo.has_webauthn_credential) {
                    setCanSavePasskey(true);
                }

                setIsAuthComplete(true);
            } catch (error) {
                console.error(error)
                // alert(error instanceof InvalidPasscodeError ? 'Invalid Passcode' : 'Internal error');
            }
        },
        [],
    );


    const loginWithPasskey = async (userId?: string, emailId?: string) => {
        try {
            await webauthService.login(userId);
            setIsAuthComplete(true);
        } catch (error) {
            if (error instanceof WebauthnRequestCancelledError && emailId && userId) {
                setIsPasscodeRequired(true);
                await initiatePasskeyAuthentication(userId, emailId);
            }
        }
    };


    const registerWithPasskey = async () => {
        try {
            await webauthService.register();
            setCanSavePasskey(false);
        } catch (error) {
            if (error instanceof WebauthnRequestCancelledError) {
                setCanSavePasskey(false);
            }
        }
    }

    const authInit = useCallback(
        async (event: SyntheticEvent) => {
            event.preventDefault();
            const {email} = event.target as typeof event.target & {
                email: { value: string };
            };
            setEmail(email.value);

            try {
                const userResp = await userService.createUser(email.value);
                console.log('userResp: ', userResp);
                setUserId(userResp.id);
                await initiatePasskeyAuthentication(userResp.id, userResp.email_id);
            } catch (error) {
                if (error instanceof ConflictError) {
                    const userInfo = await userService.getUserInfo(email.value);
                    setUserId(userInfo.id);
                    userInfo.has_webauthn_credential ? await loginWithPasskey(userInfo.id, userInfo.email_id) : initiatePasskeyAuthentication(userInfo.id, userInfo.email_id);
                }
            }
        },
        [],
    );

    return {
        authInit,
        isAuthComplete,
        finalisePasskeyAuthentication,
        initiatePasskeyAuthentication,
        loginWithPasskey,
        registerWithPasskey,
        isPasscodeRequired,
        canSavePasskey,
        userId,
        email
    };
}

export default useAuth;