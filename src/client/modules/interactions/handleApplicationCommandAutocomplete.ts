import {Env} from "@client/index.js";
import {badRequest, Handlers} from "@modules/index.js";
import {JsonResponse} from "@structures/index.js";
import {
    APIApplicationCommandAutocompleteInteraction,
    APIApplicationCommandInteractionDataIntegerOption,
    APIApplicationCommandInteractionDataNumberOption,
    APIApplicationCommandInteractionDataStringOption,
    ApplicationCommandOptionType,
    InteractionResponseType
} from "discord-api-types/v10";

export async function handleApplicationCommandAutocomplete(handlers: Handlers, body: APIApplicationCommandAutocompleteInteraction, env: Env): Promise<JsonResponse> {
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
        return badRequest();

    const command = handlers.chatCommands.get(body.data.name);
    if(!command?.autocompleter)
        return badRequest();

    const choices = command.autocompleter(focused.value, env);
    return new JsonResponse({
        type: InteractionResponseType.ApplicationCommandAutocompleteResult,
        data: { choices },
    });
}
