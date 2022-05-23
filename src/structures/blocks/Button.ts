import {APIButtonComponent, APIMessageComponentEmoji, ButtonStyle, ComponentType} from "discord-api-types/v10";
import {JsonConvertable} from "../json/JsonConvertable.js";

export class Button extends JsonConvertable {
    public data: APIButtonComponent & {custom_id: string, url: string} = {type: ComponentType.Button} as any;

    public setStyle(style: ButtonStyle) {
        this.data.style = style;
        return this;
    }

    public setLabel(label: string) {
        this.data.label = label;
        return this;
    }

    public setEmoji(emoji: APIMessageComponentEmoji) {
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

    public setCustomId(customId: string) {
        this.data.custom_id = customId;
        return this;
    }

    public toJson() {
        return this.data;
    }
}
