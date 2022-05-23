import {ButtonComponentHandler, Component, ComponentData} from "./Component.js";
import {APIPartialEmoji, ButtonStyle, ComponentType} from "discord-api-types/v10";

export interface ButtonComponentData extends ComponentData {
    style: ButtonStyle,
    label?: string,
    emoji?: APIPartialEmoji,
    custom_id?: string,
    url?: string,
}

export class ButtonComponent extends Component {
    public override data: ButtonComponentData = {} as ButtonComponentData;
    public override type: ComponentType = ComponentType.Button;
    public override handler: ButtonComponentHandler | undefined;

    constructor(options?: {data?: ButtonComponentData, handler?: ButtonComponentHandler}) {
        super(options);

        if(options?.handler)
            this.handler = options.handler;
    }

    public setHandler(handler: ButtonComponentHandler) {
        this.handler = handler;
        return this;
    }

    public setStyle(style: ButtonStyle) {
        this.data.style = style;
        return this;
    }

    public setLabel(label: string) {
        this.data.label = label;
        return this;
    }

    public setEmoji(emoji: APIPartialEmoji) {
        this.data.emoji = emoji;
        return this;
    }

    public setUrl(url: string) {
        this.data.url = url;
        return this;
    }

    public setDisabled(disabled: boolean) {
        this.data.disabled = disabled;
        return this;
    }
}
