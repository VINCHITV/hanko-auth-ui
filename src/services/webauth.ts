import {User, WebauthnClient, WebauthnCredentials} from "@teamhanko/hanko-frontend-sdk";
import HankoService from "./hanko";

export default class WebauthService {
    private webauthClient: WebauthnClient;

    public constructor() {
        this.webauthClient = HankoService.getHanko().webauthn;
    }

    public shouldRegister = async (user: User) => await this.webauthClient.shouldRegister(user);

    public register = async () => {
        return this.webauthClient.register();
    }
    public list = async () => {
        return this.webauthClient.listCredentials();
    }

    public login = async (userId?: string) => {
        return this.webauthClient.login(userId);
    }

    public listCredentials = async (): Promise<WebauthnCredentials> => {
        return this.webauthClient.listCredentials();
    }
};