import {User, UserClient, UserInfo} from "@teamhanko/hanko-frontend-sdk";
import HankoService from "@/services/hanko";

export default class UserService {
    private userClient: UserClient;

    public constructor() {
        this.userClient = HankoService.getHanko().user;
    }

    public createUser = async (email: string): Promise<User> => {
        return await this.userClient.create(email);
    }

    public getUserInfo = async (email: string): Promise<UserInfo> => {
        return await this.userClient.getInfo(email);
    };

    public logout = async () => {
        return await this.userClient.logout();
    }

    public getCurrentUser = async (): Promise<User> => {
        return await this.getCurrentUser();
    }

}