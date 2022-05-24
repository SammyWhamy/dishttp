import {BaseMessageResponse, BaseMessageResponseOptions} from "@structures/index.js";
import {APIInteractionResponseChannelMessageWithSource, InteractionResponseType} from "discord-api-types/v10";

export declare interface MessageResponse {
    toJson(): APIInteractionResponseChannelMessageWithSource;
}

export class MessageResponse extends BaseMessageResponse {
    constructor(options?: BaseMessageResponseOptions) {
        super(InteractionResponseType.ChannelMessageWithSource, options);
    }
}
