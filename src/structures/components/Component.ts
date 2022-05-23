import {
    APIInteractionResponseDeferredMessageUpdate,
    APIInteractionResponseUpdateMessage,
    APIMessageComponentButtonInteraction,
    APIMessageComponentSelectMenuInteraction,
    ComponentType,
} from "discord-api-types/v10";
import {ComponentResponse} from "../responses/ComponentResponse.js";

export interface ComponentData {
    custom_id?: string,
    disabled?: boolean,
}

export type ComponentResponseUnion = ComponentResponse | APIInteractionResponseDeferredMessageUpdate | APIInteractionResponseUpdateMessage;
export type ButtonComponentHandler = (component: APIMessageComponentButtonInteraction) => ComponentResponseUnion | Promise<ComponentResponseUnion>;
export type SelectMenuComponentHandler = (component: APIMessageComponentSelectMenuInteraction) => ComponentResponseUnion | Promise<ComponentResponseUnion>;

export abstract class Component {
    public data: ComponentData = {} as ComponentData;
    protected type: ComponentType;
    handler: ButtonComponentHandler | SelectMenuComponentHandler | undefined;

    protected constructor(options?: {data?: ComponentData}) {
        if(options?.data)
            this.data = options.data;

        this.type = -1;
        this.handler = null as any;
    }

    public setCustomId(customId: string) {
        this.data.custom_id = customId;
        return this;
    }

    public toJSON() {
        return this.data;
    }
}
