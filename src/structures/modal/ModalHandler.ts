import {MessageResponse} from "../responses/MessageResponse.js";
import {
    APIInteractionResponseChannelMessageWithSource,
    APIInteractionResponseDeferredChannelMessageWithSource,
    APIModalSubmitInteraction
} from "discord-api-types/v10";
import {Env} from "../../client/Client.js";

export type ModalResponseUnion = MessageResponse | APIInteractionResponseChannelMessageWithSource | APIInteractionResponseDeferredChannelMessageWithSource;
export type ModalExecutor = (modal: APIModalSubmitInteraction, env: Env) => ModalResponseUnion | Promise<ModalResponseUnion>;

export interface ModalHandlerOptions {
    customId?: string,
    executor?: ModalExecutor,
}

export class ModalHandler {
    public customId: string = null as any;
    public executor: ModalExecutor | undefined;

    constructor(options?: ModalHandlerOptions) {
        if(options?.customId)
            this.customId = options.customId;

        if(options?.executor)
            this.executor = options.executor;
    }

    public setCustomId(customId: string) {
        this.customId = customId;
        return this;
    }

    public setExecutor(executor: ModalExecutor) {
        this.executor = executor;
        return this;
    }
}
