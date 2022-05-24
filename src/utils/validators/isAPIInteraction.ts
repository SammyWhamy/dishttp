import {isSnowflake} from "@utils/index.js";
import {APIInteraction, InteractionType} from "discord-api-types/v10";

export function isAPIInteraction(body: any): body is APIInteraction {
    if (!isSnowflake(body.id)) return false;
    if (!isSnowflake(body.application_id)) return false;
    if (!(body.type in InteractionType)) return false;
    if (typeof body.token !== "string") return false;
    return body.version === 1;

}
