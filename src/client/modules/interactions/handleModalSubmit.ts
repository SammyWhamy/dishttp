import {Env} from "@client/index.js";
import {badRequest, Handlers} from "@modules/index.js";
import {JsonConvertable, JsonResponse} from "@structures/index.js";
import {APIModalSubmitInteraction} from "discord-api-types/v10";

export async function handleModalSubmit(handlers: Handlers, body: APIModalSubmitInteraction, env: Env): Promise<JsonResponse> {
    const modal = handlers.modal.get(body.data.custom_id);
    if (!modal) return badRequest();
    if (!modal.executor) throw new Error('Modal executor is not defined');
    const response = await modal.executor(body, env);
    if (response instanceof JsonConvertable) return new JsonResponse(response.toJson());
    else return new JsonResponse(response);
}
