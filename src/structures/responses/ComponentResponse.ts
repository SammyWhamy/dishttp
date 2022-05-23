import {InteractionResponseType, APIInteractionResponseUpdateMessage} from "discord-api-types/v10";
import {BaseMessageResponse, BaseMessageResponseOptions} from "./BaseMessageResponse.js";

export declare interface ComponentResponse {
    toJson(): APIInteractionResponseUpdateMessage;
}

export class ComponentResponse extends BaseMessageResponse {
    constructor(options?: BaseMessageResponseOptions) {
        super(InteractionResponseType.UpdateMessage, options);
    }
}
