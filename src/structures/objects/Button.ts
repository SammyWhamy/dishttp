import {JsonConvertable} from "@structures/index.js";
import {APIButtonComponent, APIMessageComponentEmoji, ButtonStyle, ComponentType} from "discord-api-types/v10";

export class Button extends JsonConvertable {
    public data: APIButtonComponent & {custom_id?: string, url?: string} = {type: ComponentType.Button} as any;

    public setStyle(style: ButtonStyle) {
        this.data.style = style;
        return this;
    }

    public setLabel(label?: string | null) {
        if (label === undefined || label === null) delete this.data.label;
        else this.data.label = label;
        return this;
    }

    public setEmoji(emoji?: APIMessageComponentEmoji | null) {
        if (emoji === undefined || emoji === null) delete this.data.emoji;
        else this.data.emoji = emoji;
        return this;
    }

    public setUrl(url?: string | null) {
        if (url === undefined || url === null) delete this.data.url;
        else this.data.url = url;
        return this;
    }

    public setDisabled(disabled: boolean) {
        this.data.disabled = disabled;
        return this;
    }

    public setCustomId(customId?: string | null) {
        if (customId === undefined || customId === null) delete this.data.custom_id;
        else this.data.custom_id = customId;
        return this;
    }

    public toJson() {
        return this.data;
    }
}
