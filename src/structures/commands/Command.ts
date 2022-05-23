import {
    ApplicationCommandType,
    Locale,
    APIInteractionResponseChannelMessageWithSource,
    APIInteractionResponseDeferredChannelMessageWithSource,
    APIModalInteractionResponse,
    APIChatInputApplicationCommandInteraction,
    APIUserApplicationCommandInteraction,
    APIMessageApplicationCommandInteraction
} from 'discord-api-types/v10';
import {MessageResponse} from "../responses/MessageResponse.js";
import {Env} from "../../router/Client.js";
import {ModalResponse} from "../responses/ModalResponse.js";

export interface CommandData {
    name: string,
    name_localizations?: { [ key in Locale]: string },
    dm_permission?: boolean,
    default_member_permissions?: string,
    nsfw?: boolean,
}

export type CommandResponse = ModalResponse | MessageResponse | APIInteractionResponseChannelMessageWithSource | APIInteractionResponseDeferredChannelMessageWithSource | APIModalInteractionResponse;
export type ChatCommandExecutor = (message: APIChatInputApplicationCommandInteraction, env: Env) => CommandResponse | Promise<CommandResponse>;
export type UserCommandExecutor = (message: APIUserApplicationCommandInteraction, env: Env) => CommandResponse | Promise<CommandResponse>;
export type MessageCommandExecutor = (message: APIMessageApplicationCommandInteraction, env: Env) => CommandResponse | Promise<CommandResponse>;

export abstract class Command {
    public data: CommandData = {} as CommandData;
    protected type: ApplicationCommandType;
    executor: ChatCommandExecutor | UserCommandExecutor | MessageCommandExecutor | undefined;

    protected constructor(options?: {data?: CommandData}) {
        if(options?.data)
            this.data = options.data;

        this.type = -1;
        this.executor = null as any;
    }

    public setName(name: string) {
        this.data.name = name;
        return this;
    }

    public setNameLocalizations(localizations: { [ key in Locale]: string }) {
        this.data.name_localizations = localizations;
        return this;
    }

    public setDMPermission(permission: boolean) {
        this.data.dm_permission = permission;
        return this;
    }

    public setDefaultMemberPermissions(permission: string) {
        this.data.default_member_permissions = permission;
        return this;
    }

    public toJSON() {
        return this.data;
    }
}

