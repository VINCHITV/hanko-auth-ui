import {ConfigClient, EmailClient} from "@teamhanko/hanko-frontend-sdk";
import HankoService from "@/services/hanko";

export default class EmailService {
    private emailClient: EmailClient;

    public constructor() {
        this.emailClient = HankoService.getHanko().email;
    }

    public getAllEmails = async () => {
        return await this.emailClient.list();
    }
};