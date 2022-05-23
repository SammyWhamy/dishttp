import {APIInteractionResponseChannelMessageWithSource, InteractionResponseType} from "discord-api-types/v10";
import {Embed} from "../blocks/Embed.js";
import {BaseMessageResponse} from "./BaseMessageResponse.js";

export interface MessageResponseOptions {
    tts?: boolean;
    content?: string;
    ephemeral?: boolean;
    suppressEmbeds?: boolean;
    embeds?: Embed[];
}

export declare interface MessageResponse {
    toJson(): APIInteractionResponseChannelMessageWithSource;
}

export class MessageResponse extends BaseMessageResponse {
    constructor(options?: MessageResponseOptions) {
        super(InteractionResponseType.ChannelMessageWithSource, options);
    }
}
