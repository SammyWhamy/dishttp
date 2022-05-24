import {RouteHandler, Router} from 'itty-router';
import {InteractionType} from "discord-api-types/v10";
import {isAPIInteraction} from "../util/index.js";
import {JsonResponse} from "../structures/index.js";
import {
    registerCommands,
    unregisterCommands,
    badRequest,
    notFound,
    handle,
    handleModalSubmit,
    handlePing,
    handleMessageComponent,
    handleApplicationCommand,
    handleApplicationCommandAutocomplete,
    Handlers,
} from "./modules/index.js";

export interface RouterOptions {
    baseGetHandler? (...handler: RouteHandler<Request>[]): Promise<JsonResponse> | JsonResponse;
    notFoundHandler? (...handler: RouteHandler<Request>[]): Promise<JsonResponse> | JsonResponse;
}

export interface APIOptions {
    proxyURL?: string;
}

export type Env = { [key: string]: string };

export class Client {
    private readonly router: Router<Request, {}>;
    public readonly proxyURL: string | undefined;
    public handlers: Handlers = new Handlers();

    constructor(routerOptions?: RouterOptions, apiOptions?: APIOptions) {
        this.router = Router();
        this.router.post('/', this.handlePostRequest.bind(this));
        this.router.get("/", routerOptions?.baseGetHandler || notFound);
        this.router.all('*', routerOptions?.notFoundHandler || notFound);

        this.proxyURL = apiOptions?.proxyURL;
    }

    private async handlePostRequest(request: Request, env: Env): Promise<JsonResponse> {
        if (!request.json)
            return badRequest();

        const body = await request.json();

        if (!isAPIInteraction(body))
            return badRequest();
        else if (body.type === InteractionType.Ping)
            return handlePing();
        else if (body.type === InteractionType.ModalSubmit)
            return handleModalSubmit(this.handlers, body, env);
        else if (body.type === InteractionType.MessageComponent)
            return handleMessageComponent(this.handlers, body, env);
        else if (body.type === InteractionType.ApplicationCommand)
            return handleApplicationCommand(this.handlers, body, env);
        else if (body.type === InteractionType.ApplicationCommandAutocomplete)
            return handleApplicationCommandAutocomplete(this.handlers, body, env);
        else
            return badRequest();
    }

    public addHandler = this.handlers.addHandler;
    public addHandlers = this.handlers.addHandlers;

    public registerCommands = registerCommands;
    public unregisterCommands = unregisterCommands;

    public export = () => ({fetch: async (request: Request, env: {[key: string]: any}) => handle(this.router, request, env)});
}
