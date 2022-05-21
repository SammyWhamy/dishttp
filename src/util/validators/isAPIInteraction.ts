import {APIInteraction, InteractionType} from "discord-api-types/v10";
import {isSnowflake} from "./isSnowflake.js";

export function isAPIInteraction(body: any): body is APIInteraction {
    if (!isSnowflake(body.id)) return false;
    if (!isSnowflake(body.application_id)) return false;
    if (!(body.type in InteractionType)) return false;
    if (typeof body.token !== "string") return false;
    if (body.version !== 1) return false;
    return true;
}
