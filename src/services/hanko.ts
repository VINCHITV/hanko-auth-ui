import {Hanko} from "@teamhanko/hanko-frontend-sdk";

export default class HankoService {
    private static hankoInstance: Hanko;
    private static HANKO_API: string = "http://localhost:8000";

    private constructor() {
    }

    public static getHanko(): Hanko {
        if (!HankoService.hankoInstance) {
            HankoService.hankoInstance = new Hanko(this.HANKO_API);
        }

        return HankoService.hankoInstance;
    }
}