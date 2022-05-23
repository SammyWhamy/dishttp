import {MessageResponse} from "../responses/MessageResponse.js";
import {
    APIInteractionResponseChannelMessageWithSource,
    APIInteractionResponseDeferredChannelMessageWithSource,
    APIModalSubmitInteraction
} from "discord-api-types/v10.js";
import {Env} from "../../router/Client.js";

export interface ModalHandlerOptions {
    customId: string;
}

export type ModalResponseUnion = MessageResponse | APIInteractionResponseChannelMessageWithSource | APIInteractionResponseDeferredChannelMessageWithSource;
export type ModalExecutor = (modal: APIModalSubmitInteraction, env: Env) => ModalResponseUnion | Promise<ModalResponseUnion>;

export class ModalHandler {
    public customId: string = null as any;
    public executor: ModalExecutor | undefined;

    constructor(options?: ModalHandlerOptions) {
        if(options?.customId)
            this.customId = options.customId;
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
