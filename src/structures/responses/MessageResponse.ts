import {APIInteractionResponseChannelMessageWithSource, InteractionResponseType} from "discord-api-types/v10";
import {BaseMessageResponse, BaseMessageResponseOptions} from "./BaseMessageResponse.js";

export declare interface MessageResponse {
    toJson(): APIInteractionResponseChannelMessageWithSource;
}

export class MessageResponse extends BaseMessageResponse {
    constructor(options?: BaseMessageResponseOptions) {
        super(InteractionResponseType.ChannelMessageWithSource, options);
    }
}
