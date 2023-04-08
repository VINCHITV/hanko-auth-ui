import React, {useEffect, useState} from 'react';
import UserService from "@/services/user";
import {useNavigate} from "react-router-dom";
import Navbar from "@/components/Navbar";
import ConfigService from "@/services/config";
import EmailService from "@/services/email";
import {Emails, WebauthnCredentials} from "@teamhanko/hanko-frontend-sdk";
import WebauthService from "@/services/webauth";

function Home() {
    const userService = new UserService();
    const emailService = new EmailService();
    const webauthService = new WebauthService();
    const navigate = useNavigate();
    const [emails, setEmails] = useState<Emails>([]);
    const [credentials, setCredentials] = useState<WebauthnCredentials>([]);

    const loadEmails = async () => {
        const emails = await emailService.getAllEmails();
        setEmails(emails);
    };

    const loadCredentials = async () => {
        const credentials = await webauthService.listCredentials();
        console.log('credentials: ', credentials);
        setCredentials(credentials);
    }

    useEffect(() => {
        loadEmails();
        loadCredentials();
    }, []);


    return (
        <>
            <Navbar title="You are now authenticated"/>
            <div className="flex flex-col items-center justify-center mt-56 gap-8">
                <ul className="menu menu-compact lg:menu-normal bg-base-300 w-56 p-2 rounded-box">
                    <li className="menu-title">
                        <span>Emails</span>
                    </li>
                    {emails.map(email => <li key={email.id}><a>{email.address}</a></li>)}
                </ul>
                <ul className="menu menu-compact lg:menu-normal bg-base-300 w-56 p-2 rounded-box">
                    <li className="menu-title">
                        <span>Passcodes</span>
                    </li>
                    {credentials.map(credential => <li key={credential.id}><a>PASSKEY-{credential.public_key.substring(0, 5)}</a></li>)}
                </ul>
                <button
                    className="btn btn-error w-56"
                    onClick={async () => {
                        await userService.logout();
                        navigate("/", {replace: true});
                    }}
                >
                    Logout
                </button>
            </div>
        </>
    );
}

export default Home;