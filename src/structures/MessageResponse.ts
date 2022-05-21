import {InteractionResponseType, APIInteractionResponseChannelMessageWithSource} from "discord-api-types/v10";
import {JsonConvertable} from "./JsonConvertable.js";
import {Embed} from "./Embed.js";

export interface MessageResponseOptions {
    tts?: boolean;
    content?: string;
    ephemeral?: boolean;
    suppressEmbeds?: boolean;
    embeds?: Embed[];
}

export class MessageResponse extends JsonConvertable {
    private readonly type = InteractionResponseType.ChannelMessageWithSource;
    private tts = false;
    private flags = 0;
    private content: string | undefined;
    private embeds: Embed[] = [];

    constructor(options?: MessageResponseOptions) {
        super();

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
    }

    public setTTS(tts: boolean): MessageResponse {
        this.tts = tts;
        return this;
    }

    public setContent(content: string): MessageResponse {
        this.content = content;
        return this;
    }

    public setEphemeral(ephemeral: boolean): MessageResponse {
        if (ephemeral)
            this.flags! |= (1 << 6);
        else
            this.flags! &= ~(1 << 6);
        return this;
    }

    public suppressEmbeds(suppress: boolean): MessageResponse {
        if (suppress)
            this.flags! |= (1 << 2);
        else
            this.flags! &= ~(1 << 2);
        return this;
    }

    public setEmbeds(embeds: Embed[] | undefined): MessageResponse {
        this.embeds = embeds || [];
        return this;
    }

    public addEmbed(embed: Embed): MessageResponse {
        this.embeds.push(embed);
        return this;
    }

    public addEmbeds(embeds: Embed[]): MessageResponse {
        this.embeds.push(...embeds);
        return this;
    }

    public toJson(): APIInteractionResponseChannelMessageWithSource {
        return {
            type: this.type,
            data: {
                flags: this.flags,
                content: this.content,
                tts: this.tts,
                embeds: this.embeds.map(e => e.toJson())
            }
        }
    }
}
