import {Component, ComponentData, SelectMenuComponentHandler} from "./Component.js";
import {APISelectMenuOption, ComponentType} from "discord-api-types/v10";

export interface SelectMenuComponentData extends ComponentData {
    custom_id: string,
    options: APISelectMenuOption[],
    placeholder?: string,
    min_values?: number,
    max_values?: number,
}

export class SelectMenuComponent extends Component {
    public override data: SelectMenuComponentData = {} as SelectMenuComponentData;
    public override type: ComponentType = ComponentType.SelectMenu;
    public override handler: SelectMenuComponentHandler | undefined;

    constructor(options?: {data?: SelectMenuComponentData, handler?: SelectMenuComponentHandler}) {
        super(options);

        if(options?.handler)
            this.handler = options.handler;
    }

    public setHandler(handler: SelectMenuComponentHandler) {
        this.handler = handler;
        return this;
    }

    public setOptions(options: APISelectMenuOption[]) {
        this.data.options = options;
        return this;
    }

    public setPlaceholder(placeholder: string) {
        this.data.placeholder = placeholder;
        return this;
    }

    public setMinValues(minValues: number) {
        this.data.min_values = minValues;
        return this;
    }

    public setMaxValues(maxValues: number) {
        this.data.max_values = maxValues;
        return this;
    }
}
