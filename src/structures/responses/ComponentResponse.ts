import {BaseMessageResponse, BaseMessageResponseOptions} from "@structures/index.js";
import {APIInteractionResponseUpdateMessage, InteractionResponseType} from "discord-api-types/v10";

export declare interface ComponentResponse {
    toJson(): APIInteractionResponseUpdateMessage;
}

export class ComponentResponse extends BaseMessageResponse {
    constructor(options?: BaseMessageResponseOptions) {
        super(InteractionResponseType.UpdateMessage, options);
    }
}
