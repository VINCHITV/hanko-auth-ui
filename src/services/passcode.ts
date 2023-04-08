import {PasscodeClient} from "@teamhanko/hanko-frontend-sdk";
import HankoService from "@/services/hanko";

export class PasscodeService {
    private passcodeClient: PasscodeClient;

    public constructor() {
        this.passcodeClient = HankoService.getHanko().passcode;
    }

    public initialise = async ({userId, emailId}: { userId: string, emailId: string }) => {
        return await this.passcodeClient.initialize(userId, emailId, true);
    }
    public finalise = async ({userId, code}: { userId: string, code: string }) => {
        console.log({userId, code})
        return await this.passcodeClient.finalize(userId, code);
    }
}