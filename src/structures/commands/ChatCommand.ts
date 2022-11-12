import {Env} from "@client/index.js";
import {ChatCommandExecutor, Command, CommandData} from "@structures/index.js";
import {APIApplicationCommandOption, ApplicationCommandType, Locale} from "discord-api-types/v10";

export interface ChatCommandData extends CommandData {
    options?: APIApplicationCommandOption[],
    description: string,
    description_localizations?: { [ key in Locale]: string },
}

export type Choice = { name: string, value: string }
export type Autocompleter = (query: string | number, env: Env) => Choice[] | Promise<Choice[]>;

export class ChatCommand extends Command {
    public override data: ChatCommandData = {} as ChatCommandData;
    public override type: ApplicationCommandType = ApplicationCommandType.ChatInput;
    public override executor: ChatCommandExecutor | undefined;
    public autocompleter: Autocompleter | undefined;

    constructor(options?: {data?: ChatCommandData, executor?: ChatCommandExecutor, autocompleter?: Autocompleter}) {
        super();

        if(options?.data)
            this.data = options.data;

        if(options?.executor)
            this.executor = options.executor;

        if(options?.autocompleter)
            this.autocompleter = options.autocompleter;
    }

    public setOptions(options: APIApplicationCommandOption[]) {
        this.data.options = options;
        return this;
    }

    public setExecutor(executor: ChatCommandExecutor) {
        this.executor = executor;
        return this;
    }

    public setDescription(description: string) {
        this.data.description = description;
        return this;
    }

    public setDescriptionLocalizations(localizations: { [ key in Locale]: string }) {
        this.data.description_localizations = localizations;
        return this;
    }
}
