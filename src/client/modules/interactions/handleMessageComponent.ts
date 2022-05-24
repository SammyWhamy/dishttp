import {Handlers} from "../handlers.js";
import {Env} from "../../Client.js";
import {ComponentHandler, JsonConvertable, JsonResponse} from "../../../structures/index.js";
import {APIMessageComponentInteraction, ComponentType} from "discord-api-types/v10";
import {badRequest} from "../web.js";

export async function handleMessageComponent(handlers: Handlers, body: APIMessageComponentInteraction, env: Env): Promise<JsonResponse> {
    let component: ComponentHandler | undefined;

    switch(body.data.component_type) {
        case ComponentType.Button:
            component = handlers.components.button.get(body.data.custom_id);
            break;
        case ComponentType.SelectMenu:
            component = handlers.components.selectMenu.get(body.data.custom_id);
            break;
    }

    if(!component) return badRequest();
    if(!component.executor) throw new Error('Component executor is not defined');
    const response = await component.executor(body as any, env);
    if (response instanceof JsonConvertable) return new JsonResponse(response.toJson());
    else return new JsonResponse(response);
}
