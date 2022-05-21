import {Router, RouteHandler} from 'itty-router';
import {ApplicationCommandType, InteractionResponseType, InteractionType} from "discord-api-types/v10";
import {isAPIInteraction} from "../util/validators/index.js";
import {verifyKey} from '../util/index.js';
import {ChatCommand, UserCommand, MessageCommand, JsonResponse} from "../structures/index.js";
import {JSON_HEADERS} from "../constants/index.js";
import {JsonConvertable} from "../structures/JsonConvertable.js";

export interface RouterOptions {
    notFoundHandler? (...handler: RouteHandler<Request>[]): Promise<JsonResponse> | JsonResponse;
}

export interface RegisterOptions {
    token: string;
    applicationId: string;
    guildId?: string;
}

export class Client {
    private readonly router: Router<Request, {}>;
    public chatCommands: Map<string, ChatCommand> = new Map<string, ChatCommand>();
    public userCommands: Map<string, UserCommand> = new Map<string, UserCommand>();
    public messageCommands: Map<string, MessageCommand> = new Map<string, MessageCommand>();

    constructor(options?: RouterOptions) {
        this.router = Router();
        this.router.post('/', this.handlePostRequest.bind(this));
        this.router.all('*', options?.notFoundHandler || Client.notFound);
    }

    private async handlePostRequest(request: Request): Promise<JsonResponse> {
        if (!request.json) return Client.badRequest();

        const body = await request.json();

        if (!isAPIInteraction(body)) return Client.badRequest();

        if (body.type === InteractionType.Ping) return Client.interactionPong();

        if (body.type === InteractionType.ApplicationCommand) {
            let command: ChatCommand | UserCommand | MessageCommand | undefined;

            switch(body.data.type) {
                case ApplicationCommandType.ChatInput:
                    command = this.chatCommands.get(body.data.name);
                    break;
                case ApplicationCommandType.Message:
                    command = this.messageCommands.get(body.data.name);
                    break;
                case ApplicationCommandType.User:
                    command = this.userCommands.get(body.data.name);
                    break;
            }

            if(!command) return Client.badRequest();
            if(!command.executor) throw new Error('Command executor is not defined');
            const response = await command.executor(body as any);
            if (response instanceof JsonConvertable) return new JsonResponse(response.toJson());
            else return new JsonResponse(response);
        }

        return Client.badRequest();
    }

    public async handle(request: Request, env: { [key: string]: string }): Promise<JsonResponse> {
        if(request.method === "POST") {
            const valid = await Client.verifyPost(request, env);
            if(!valid) return Client.unauthorized();
        }

        return this.router.handle(request);
    }

    public addCommand(command: ChatCommand | UserCommand | MessageCommand): void {
        if(command instanceof ChatCommand)
            this.chatCommands.set(command.data.name, command);
        else if(command instanceof UserCommand)
            this.userCommands.set(command.data.name, command);
        else
            this.messageCommands.set(command.data.name, command);
    }

    public addCommands(commands: (ChatCommand | UserCommand | MessageCommand)[]): void {
        for(const command of commands)
            this.addCommand(command);
    }

    public export() {
        return {
            fetch: async (request: Request, env: {[key: string]: any}) => this.handle(request, env),
        }
    }

    public async registerCommands(options: RegisterOptions): Promise<any> {
        const url = options.guildId
            ? `https://discord.com/api/v10/applications/${options.applicationId}/guilds/${options.guildId}/commands`
            : `https://discord.com/api/v10/applications/${options.applicationId}/commands`;

        let commands = [
            ...this.chatCommands.values(),
            ...this.userCommands.values(),
            ...this.messageCommands.values()
        ].map(c => {
            return {...c.data, type: c.type};
        });

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${options.token}`,
            },
            method: 'PUT',
            body: JSON.stringify(commands),
        });

        if (!response.ok) {
            console.error(`Error registering commands (${response.status}): ${await response.text()}`);
            return;
        }

        console.log('Commands registered');

        return await response.json();
    }

    public async unregisterAllCommands(options: RegisterOptions): Promise<any> {
        const url = options.guildId
            ? `https://discord.com/api/v10/applications/${options.applicationId}/guilds/${options.guildId}/commands`
            : `https://discord.com/api/v10/applications/${options.applicationId}/commands`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${options.token}`,
            },
            method: 'PUT',
            body: JSON.stringify([]),
        });

        if (!response.ok) {
            console.error(`Error removing commands (${response.status}): ${await response.text()}`);
            return;
        }

        console.log('Commands registered');

        return await response.json();
    }

    private static async verifyPost(request: Request, env: { [key: string]: string }): Promise<boolean> {
        const signature = request.headers.get('x-signature-ed25519');
        const timestamp = request.headers.get('x-signature-timestamp');

        if(!signature || !timestamp || !env.DISCORD_PUBLIC_KEY)
            return false;

        const body = await request.clone().arrayBuffer();
        return verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
    }

    private static notFound = () => new JsonResponse({error: 'Not found'}, {...JSON_HEADERS, status: 404});
    private static badRequest = () => new JsonResponse({error: 'Bad request'}, {...JSON_HEADERS, status: 400});
    private static unauthorized = () => new JsonResponse({error: 'Unauthorized'}, {...JSON_HEADERS, status: 401});
    private static interactionPong = () => new JsonResponse({type: InteractionResponseType.Pong});
}
