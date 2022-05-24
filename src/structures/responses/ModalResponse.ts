import {JsonConvertable} from "../json/JsonConvertable.js";
import {
    APIModalInteractionResponse,
    APITextInputComponent,
    InteractionResponseType,
    APIActionRowComponent
} from "discord-api-types/v10";

export interface ModalResponseOptions {
    customId?: string;
    title?: string;
    components?: APIActionRowComponent<APITextInputComponent>[];
}

export class ModalResponse extends JsonConvertable {
    protected readonly type = InteractionResponseType.Modal;
    public custom_id: string = null as any;
    public title: string = null as any;
    public components: APIActionRowComponent<APITextInputComponent>[] = [];

    constructor(options?: ModalResponseOptions) {
        super();

        if (options?.customId)
            this.custom_id = options.customId;

        if (options?.title)
            this.title = options.title;

        if (options?.components)
            this.components = options.components;
    }

    public setCustomId(customId: string): ModalResponse {
        this.custom_id = customId;
        return this;
    }

    public setTitle(title: string): ModalResponse {
        this.title = title;
        return this;
    }

    public setComponents(components: APIActionRowComponent<APITextInputComponent>[]): ModalResponse {
        this.components = components;
        return this;
    }

    public addComponent(component: APIActionRowComponent<APITextInputComponent>): ModalResponse {
        this.components.push(component);
        return this;
    }

    public addComponents(components: APIActionRowComponent<APITextInputComponent>[]): ModalResponse {
        for (const component of components)
            this.components.push(component);

        return this;
    }

    public override toJson(): APIModalInteractionResponse {
        return {
            type: this.type,
            data: {
                custom_id: this.custom_id,
                title: this.title,
                components: this.components,
            }
        };
    }
}
