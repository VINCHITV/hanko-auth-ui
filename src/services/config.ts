import {ConfigClient} from "@teamhanko/hanko-frontend-sdk";
import HankoService from "@/services/hanko";

export default class ConfigService {
    private configClient: ConfigClient;

    public constructor() {
        this.configClient = HankoService.getHanko().config;
    }

    public get = async () => {
        return await this.configClient.get();
    }
};