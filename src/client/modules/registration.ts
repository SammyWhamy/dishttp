import {Client} from "@client/index.js";
import {BASE_URL, JSON_HEADER} from "@constants/index.js";
import {Command} from "@structures/index.js";

export interface RegisterOptions {
    token: string;
    applicationId: string;
    guildId?: string;
}

async function putApplicationCommands(client: Client, options: RegisterOptions, commands: (Command['data'] & {type: number})[]): Promise<any> {
    const url = options.guildId
        ? `${client.proxyURL || BASE_URL}/applications/${options.applicationId}/guilds/${options.guildId}/commands`
        : `${client.proxyURL || BASE_URL}/applications/${options.applicationId}/commands`;

    const response = await fetch(url, {
        headers: {
            ...JSON_HEADER,
            Authorization: `Bot ${options.token}`,
        },
        method: 'PUT',
        body: JSON.stringify(commands),
    });

    if (!response.ok) {
        console.error(`Error updating commands (${response.status}): ${await response.text()}`);
        return response.json();
    }

    return await response.json();
}

export function registerCommands(this: Client, options: RegisterOptions): Promise<any> {
    let commands = [
        ...this.handlers.chatCommands.values(),
        ...this.handlers.userCommands.values(),
        ...this.handlers.messageCommands.values()
    ].map(c => {
        return {...c.data, type: c.type};
    });

    return putApplicationCommands(this, options, commands);
}

export function unregisterCommands(this: Client, options: RegisterOptions): Promise<any> {
    return putApplicationCommands(this, options, []);
}
