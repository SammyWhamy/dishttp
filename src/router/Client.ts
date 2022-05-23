import {RouteHandler, Router} from 'itty-router';
import {
    APIApplicationCommandInteractionDataIntegerOption,
    APIApplicationCommandInteractionDataNumberOption,
    APIApplicationCommandInteractionDataStringOption,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ComponentType,
    InteractionResponseType,
    InteractionType
} from "discord-api-types/v10";
import {isAPIInteraction} from "../util/validators/index.js";
import {verifyKey} from '../util/index.js';
import {
    ChatCommand,
    Command,
    JsonResponse,
    MessageCommand, SelectMenuComponentHandler,
    UserCommand
} from "../structures/index.js";
import {JSON_HEADERS} from "../constants/index.js";
import {JsonConvertable} from "../structures/json/JsonConvertable.js";
import {ButtonComponentHandler} from "../structures/index.js";
import {ComponentHandler} from "../structures/components/ComponentHandler.js";

export interface RouterOptions {
    notFoundHandler? (...handler: RouteHandler<Request>[]): Promise<JsonResponse> | JsonResponse;
}

export interface RegisterOptions {
    token: string;
    applicationId: string;
    guildId?: string;
}

export interface ClientHandlers {
    commands: {
        chat: Map<string, ChatCommand>,
        user: Map<string, UserCommand>,
        message: Map<string, MessageCommand>,
    },
    components: {
        button: Map<string, ButtonComponentHandler>,
        selectMenu: Map<string, SelectMenuComponentHandler>,
    },
}

export class Client {
    private readonly router: Router<Request, {}>;
    public handlers: ClientHandlers = {
        commands: {
            chat: new Map<string, ChatCommand>(),
            user: new Map<string, UserCommand>(),
            message: new Map<string, MessageCommand>(),
        },
        components: {
            button: new Map<string, ButtonComponentHandler>(),
            selectMenu: new Map<string, SelectMenuComponentHandler>(),
        },
    }

    constructor(options?: RouterOptions) {
        this.router = Router();
        this.router.post('/', this.handlePostRequest.bind(this));
        this.router.all('*', options?.notFoundHandler || Client.notFound);
    }

    private async handlePostRequest(request: Request, env: NodeJS.ProcessEnv): Promise<JsonResponse> {
        if (!request.json) return Client.badRequest();

        const body = await request.json();

        if (!isAPIInteraction(body)) return Client.badRequest();

        if (body.type === InteractionType.Ping) return Client.interactionPong();

        if (body.type === InteractionType.MessageComponent) {
            let component: ComponentHandler | undefined;

            switch(body.data.component_type) {
                case ComponentType.Button:
                    component = this.handlers.components.button.get(body.data.custom_id);
                    break;
                case ComponentType.SelectMenu:
                    component = this.handlers.components.selectMenu.get(body.data.custom_id);
                    break;
            }

            if(!component) return Client.badRequest();
            if(!component.executor) throw new Error('Component executor is not defined');
            const response = await component.executor(body as any, env);
            if (response instanceof JsonConvertable) return new JsonResponse(response.toJson());
            else return new JsonResponse(response);
        }

        if (body.type === InteractionType.ApplicationCommand) {
            let command: Command | undefined;

            switch(body.data.type) {
                case ApplicationCommandType.ChatInput:
                    command = this.handlers.commands.chat.get(body.data.name);
                    break;
                case ApplicationCommandType.Message:
                    command = this.handlers.commands.message.get(body.data.name);
                    break;
                case ApplicationCommandType.User:
                    command = this.handlers.commands.user.get(body.data.name);
                    break;
            }

            if(!command) return Client.badRequest();
            if(!command.executor) throw new Error('Command executor is not defined');
            const response = await command.executor(body as any, env);
            if (response instanceof JsonConvertable) return new JsonResponse(response.toJson());
            else return new JsonResponse(response);
        }

        if(body.type === InteractionType.ApplicationCommandAutocomplete) {
            const focused = body.data.options.find(o => {
                switch(o.type) {
                    case ApplicationCommandOptionType.String:
                        return o.focused;
                    case ApplicationCommandOptionType.Number:
                        return o.focused;
                    case ApplicationCommandOptionType.Integer:
                        return o.focused;
                    default:
                        return false;
                }
            }) as APIApplicationCommandInteractionDataStringOption | APIApplicationCommandInteractionDataNumberOption | APIApplicationCommandInteractionDataIntegerOption | undefined;

            if(!focused)
                return Client.badRequest();

            const command = this.handlers.commands.chat.get(body.data.name);
            if(!command?.autocompleter)
                return Client.badRequest();

            const choices = command.autocompleter(focused.value);
            return new JsonResponse({
                type: InteractionResponseType.ApplicationCommandAutocompleteResult,
                data: { choices },
            });
        }

        return Client.badRequest();
    }

    public async handle(request: Request, env: { [key: string]: string }): Promise<JsonResponse> {
        if(request.method === "POST") {
            const valid = await Client.verifyPost(request, env);
            if(!valid) {
                return Client.unauthorized();
            }
        }

        return this.router.handle(request);
    }

    public addCommand(command: Command): void {
        if(command instanceof ChatCommand)
            this.handlers.commands.chat.set(command.data.name, command);
        else if(command instanceof UserCommand)
            this.handlers.commands.user.set(command.data.name, command);
        else if(command instanceof MessageCommand)
            this.handlers.commands.message.set(command.data.name, command);
    }

    public addCommands(commands: Command[]): void {
        for(const command of commands)
            this.addCommand(command);
    }

    public addHandler(handler: ComponentHandler): void {
        if(handler instanceof ButtonComponentHandler)
            this.handlers.components.button.set(handler.customId, handler);
        else if(handler instanceof SelectMenuComponentHandler)
            this.handlers.components.selectMenu.set(handler.customId, handler);
    }

    public addHandlers(handlers: ComponentHandler[]): void {
        for(const handler of handlers)
            this.addHandler(handler);
    }

    public export = () => ({fetch: async (request: Request, env: {[key: string]: any}) => this.handle(request, env)});

    public async registerCommands(options: RegisterOptions): Promise<any> {
        const url = options.guildId
            ? `https://discord.com/api/v10/applications/${options.applicationId}/guilds/${options.guildId}/commands`
            : `https://discord.com/api/v10/applications/${options.applicationId}/commands`;

        let commands = [
            ...this.handlers.commands.chat.values(),
            ...this.handlers.commands.user.values(),
            ...this.handlers.commands.message.values()
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
            return commands;
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
