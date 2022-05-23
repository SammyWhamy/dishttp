import {
    APIInteractionResponseDeferredMessageUpdate,
    APIInteractionResponseUpdateMessage,
    APIMessageComponentButtonInteraction,
    APIMessageComponentSelectMenuInteraction,
    ComponentType,
} from "discord-api-types/v10";
import {ComponentResponse} from "../responses/ComponentResponse.js";
import {MessageResponse} from "../responses/MessageResponse.js";

export interface ComponentHandlerData {
    custom_id: string,
}

export type ComponentResponseUnion = ComponentResponse | MessageResponse | APIInteractionResponseDeferredMessageUpdate | APIInteractionResponseUpdateMessage;
export type ButtonComponentExecutor = (component: APIMessageComponentButtonInteraction, env: NodeJS.ProcessEnv) => ComponentResponseUnion | Promise<ComponentResponseUnion>;
export type SelectMenuComponentExecutor = (component: APIMessageComponentSelectMenuInteraction, env: NodeJS.ProcessEnv) => ComponentResponseUnion | Promise<ComponentResponseUnion>;

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
