import type { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter } from 'discord-api-types/v10';
import {JsonConvertable} from "./JsonConvertable.js";

export type RGBTuple = [red: number, green: number, blue: number];

export interface IconData {
    iconURL?: string;
    proxyIconURL?: string;
}

export type EmbedAuthorData = Omit<APIEmbedAuthor, 'icon_url' | 'proxy_icon_url'> & IconData;

export type EmbedAuthorOptions = Omit<EmbedAuthorData, 'proxyIconURL'>;

export type EmbedFooterData = Omit<APIEmbedFooter, 'icon_url' | 'proxy_icon_url'> & IconData;

export type EmbedFooterOptions = Omit<EmbedFooterData, 'proxyIconURL'>;

export class Embed extends JsonConvertable {
    private readonly data: APIEmbed;

    public constructor(data: APIEmbed = {}) {
        super();

        this.data = { ...data };

        if (data.timestamp)
            this.data.timestamp = new Date(data.timestamp).toISOString();
    }

    public addFields(fields: APIEmbedField[]): this {
        if (this.data.fields) this.data.fields.push(...fields);
        else this.data.fields = fields;
        return this;
    }

    public setAuthor(options: EmbedAuthorOptions | null): this {
        if (options === null) {
            // @ts-expect-error : exactOptionalPropertyTypes
            this.data.author = undefined;
            return this;
        }

        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.author = { name: options.name, url: options.url, icon_url: options.iconURL };
        return this;
    }

    public setColor(color: number | RGBTuple | null): this {
        if (Array.isArray(color)) {
            const [red, green, blue] = color;
            this.data.color = (red << 16) + (green << 8) + blue;
            return this;
        }

        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.color = color ?? undefined;
        return this;
    }

    public setDescription(description: string | null): this {
        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.description = description ?? undefined;
        return this;
    }

    public setFooter(options: EmbedFooterOptions | null): this {
        if (options === null) {
            // @ts-expect-error : exactOptionalPropertyTypes
            this.data.footer = undefined;
            return this;
        }

        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.footer = { text: options.text, icon_url: options.iconURL };
        return this;
    }

    public setImage(url: string | null): this {
        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.image = url ? { url } : undefined;
        return this;
    }

    public setThumbnail(url: string | null): this {
        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.thumbnail = url ? { url } : undefined;
        return this;
    }

    public setTimestamp(timestamp: number | Date | null = Date.now()): this {
        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.timestamp = timestamp ? new Date(timestamp).toISOString() : undefined;
        return this;
    }

    public setTitle(title: string | null): this {
        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.title = title ?? undefined;
        return this;
    }

    public setURL(url: string | null): this {
        // @ts-expect-error : exactOptionalPropertyTypes
        this.data.url = url ?? undefined;
        return this;
    }

    public toJson() {
        return this.data;
    }
}
