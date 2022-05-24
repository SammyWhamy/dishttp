import {JsonResponse} from "@structures/index.js";
import {InteractionResponseType} from "discord-api-types/v10";

export const handlePing = () => new JsonResponse({type: InteractionResponseType.Pong});
