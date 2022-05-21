import {ChatCommandExecutor, Command, CommandData} from "./Command.js";
import {APIApplicationCommandOption, ApplicationCommandType} from "discord-api-types/v10";
import {Locale} from "discord-api-types/v10.js";

export interface ChatCommandData extends CommandData {
    options?: APIApplicationCommandOption[],
    description: string,
    description_localizations?: { [ key in Locale]: string },
}

export type Choice = { name: string, value: string }
export type Autocompleter = (query: string | number) => Choice[];

export class ChatCommand extends Command {
    public override data: ChatCommandData = {} as ChatCommandData;
    public override type: ApplicationCommandType = ApplicationCommandType.ChatInput;
    public override executor: ChatCommandExecutor | undefined;
    public autocompleter: Autocompleter | undefined;

    constructor(options: {data?: ChatCommandData, executor?: ChatCommandExecutor, autocompleter: Autocompleter}) {
        super();

        if(options.data)
            this.data = options.data;

        if(options.executor)
            this.executor = options.executor;

        if(options.autocompleter)
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
