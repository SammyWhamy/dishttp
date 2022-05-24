import {APIApplicationCommandInteraction, ApplicationCommandType} from "discord-api-types/v10";
import {Command, JsonConvertable, JsonResponse} from "../../../structures/index.js";
import {badRequest} from "../web.js";
import {Env} from "../../Client.js";
import {Handlers} from "../handlers.js";

export async function handleApplicationCommand(handlers: Handlers, body: APIApplicationCommandInteraction, env: Env): Promise<JsonResponse> {
    let command: Command | undefined;

    switch(body.data.type) {
        case ApplicationCommandType.ChatInput:
            command = handlers.commands.chat.get(body.data.name);
            break;
        case ApplicationCommandType.Message:
            command = handlers.commands.message.get(body.data.name);
            break;
        case ApplicationCommandType.User:
            command = handlers.commands.user.get(body.data.name);
            break;
    }

    if(!command) return badRequest();
    if(!command.executor) throw new Error('Command executor is not defined');
    const response = await command.executor(body as any, env);
    if (response instanceof JsonConvertable) return new JsonResponse(response.toJson());
    else return new JsonResponse(response);
}
