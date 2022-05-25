import {Env} from "@client/index.js";
import {badRequest, Handlers} from "@modules/index.js";
import {Command, JsonConvertable, JsonResponse} from "@structures/index.js";
import {APIApplicationCommandInteraction, ApplicationCommandType} from "discord-api-types/v10";

export async function handleApplicationCommand(handlers: Handlers, body: APIApplicationCommandInteraction, env: Env): Promise<JsonResponse> {
    let command: Command | undefined;

    switch(body.data.type) {
        case ApplicationCommandType.ChatInput:
            command = handlers.chatCommands.get(body.data.name);
            break;
        case ApplicationCommandType.Message:
            command = handlers.messageCommands.get(body.data.name);
            break;
        case ApplicationCommandType.User:
            command = handlers.userCommands.get(body.data.name);
            break;
    }

    if(!command) return badRequest();
    if(!command.executor) throw new Error('Command executor is not defined');
    const response = await command.executor(body as any, env);
    if (response instanceof JsonConvertable) return new JsonResponse(response.toJson());
    else return new JsonResponse(response);
}
