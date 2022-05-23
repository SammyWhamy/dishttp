import {InteractionResponseType, APIInteractionResponseUpdateMessage} from "discord-api-types/v10";
import {BaseMessageResponse} from "./BaseMessageResponse.js";
import {MessageResponseOptions} from "./MessageResponse.js";

export declare interface ComponentResponse {
    toJson(): APIInteractionResponseUpdateMessage;
}

export class ComponentResponse extends BaseMessageResponse {
    constructor(options?: MessageResponseOptions) {
        super(InteractionResponseType.UpdateMessage, options);
    }
}
