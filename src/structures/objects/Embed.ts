import {JsonConvertable} from "@structures/index.js";
import {APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter} from 'discord-api-types/v10';

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

    public addField(name: string, value: string, inline: boolean = false): this {
        if (this.data.fields) this.data.fields.push({ name, value, inline });
        else this.data.fields = [{ name, value, inline }];
        return this;
    }

    public setAuthor(options: Omit<APIEmbedAuthor, 'proxyIconURL'> | null): this {
        if (options === null) delete this.data.author;
        else this.data.author = { name: options.name, url: options.url!, icon_url: options.icon_url! };
        return this;
    }

    public setColor(color: number | null): this {
        if (color === null) delete this.data.color;
        else this.data.color = color;
        return this;
    }

    public setDescription(description: string | null): this {
        if (description === null) delete this.data.description;
        else this.data.description = description;
        return this;
    }

    public setFooter(options: Omit<APIEmbedFooter, 'proxyIconURL'> | null): this {
        if (options === null) delete this.data.footer;
        else this.data.footer = { text: options.text, icon_url: options.icon_url! };
        return this;
    }

    public setImage(url: string | null): this {
        if (url === null) delete this.data.image;
        else this.data.image = { url };
        return this;
    }

    public setThumbnail(url: string | null): this {
        if (url === null) delete this.data.thumbnail;
        else this.data.thumbnail = { url };
        return this;
    }

    public setTimestamp(timestamp: number | Date | null = Date.now()): this {
        if (timestamp === null) delete this.data.timestamp;
        else this.data.timestamp = new Date(timestamp).toISOString();
        return this;
    }

    public setTitle(title: string | null): this {
        if (title === null) delete this.data.title;
        else this.data.title = title;
        return this;
    }

    public setURL(url: string | null): this {
        if (url === null) delete this.data.url;
        else this.data.url = url;
        return this;
    }

    public toJson() {
        return this.data;
    }
}
