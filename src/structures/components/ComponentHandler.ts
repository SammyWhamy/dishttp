import {Env} from "@client/index.js";
import {ComponentResponse, MessageResponse, ModalResponse} from "@structures/index.js";
import {
    APIInteractionResponseDeferredMessageUpdate,
    APIInteractionResponseUpdateMessage,
    APIMessageComponentButtonInteraction,
    APIMessageComponentSelectMenuInteraction,
    ComponentType,
} from "discord-api-types/v10";

export interface ComponentHandlerData {
    custom_id: string,
}

export type ComponentResponseUnion = ModalResponse | ComponentResponse | MessageResponse | APIInteractionResponseDeferredMessageUpdate | APIInteractionResponseUpdateMessage;
export type ButtonComponentExecutor = (component: APIMessageComponentButtonInteraction, env: Env) => ComponentResponseUnion | Promise<ComponentResponseUnion>;
export type SelectMenuComponentExecutor = (component: APIMessageComponentSelectMenuInteraction, env: Env) => ComponentResponseUnion | Promise<ComponentResponseUnion>;

export abstract class ComponentHandler {
    public customId: string = null as any;
    protected type: ComponentType = -1;
    public executor: ButtonComponentExecutor | SelectMenuComponentExecutor | undefined;

    protected constructor(options?: {data?: ComponentHandlerData}) {
        if(options?.data)
            this.customId = options.data.custom_id;
    }

    public setCustomId(customId: string) {
        this.customId = customId;
        return this;
    }
}
