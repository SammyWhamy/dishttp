import {ActionRow, Embed, JsonConvertable} from "@structures/index.js";
import {APIInteractionResponse, InteractionResponseType,} from "discord-api-types/v10";

export interface BaseMessageResponseOptions {
    tts?: boolean;
    content?: string;
    ephemeral?: boolean;
    suppressEmbeds?: boolean;
    embeds?: Embed[];
    components?: ActionRow[];
}

export class BaseMessageResponse extends JsonConvertable {
    protected readonly type: InteractionResponseType.ChannelMessageWithSource | InteractionResponseType.UpdateMessage;
    protected tts = false;
    protected flags = 0;
    protected content: string | undefined;
    protected embeds: Embed[] = [];
    protected components: ActionRow[] = [];

    constructor(type: InteractionResponseType.ChannelMessageWithSource | InteractionResponseType.UpdateMessage, options?: BaseMessageResponseOptions) {
        super();

        this.type = type;

        if(options?.ephemeral)
            this.setEphemeral(true);

        if(options?.tts)
            this.setTTS(true);

        if(options?.content)
            this.setContent(options.content);

        if(options?.suppressEmbeds)
            this.suppressEmbeds(true);

        if(options?.embeds)
            this.setEmbeds(options.embeds);

        if(options?.components)
            this.setComponents(options.components);
    }

    public setTTS(tts: boolean): BaseMessageResponse {
        this.tts = tts;
        return this;
    }

    public setContent(content: string): BaseMessageResponse {
        this.content = content;
        return this;
    }

    public setEphemeral(ephemeral: boolean): BaseMessageResponse {
        if (ephemeral)
            this.flags! |= (1 << 6);
        else
            this.flags! &= ~(1 << 6);
        return this;
    }

    public suppressEmbeds(suppress: boolean): BaseMessageResponse {
        if (suppress)
            this.flags! |= (1 << 2);
        else
            this.flags! &= ~(1 << 2);
        return this;
    }

    public setEmbeds(embeds: Embed[] | undefined): BaseMessageResponse {
        this.embeds = embeds || [];
        return this;
    }

    public addEmbed(embed: Embed): BaseMessageResponse {
        this.embeds.push(embed);
        return this;
    }

    public addEmbeds(embeds: Embed[]): BaseMessageResponse {
        this.embeds.push(...embeds);
        return this;
    }

    public setComponents(components: ActionRow[]): BaseMessageResponse {
        this.components = components;
        return this;
    }

    public addComponent(component: ActionRow): BaseMessageResponse {
        this.components.push(component);
        return this;
    }

    public addComponents(components: ActionRow[]): BaseMessageResponse {
        this.components.push(...components);
        return this;
    }

    public toJson(): APIInteractionResponse {
        return {
            type: this.type,
            data: {
                flags: this.flags,
                content: this.content,
                tts: this.tts,
                embeds: this.embeds.map(e => e.toJson()),
                components: this.components.map(c => c.toJson())
            }
        }
    }
}
