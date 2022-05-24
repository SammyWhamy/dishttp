import {Command, CommandData, MessageCommandExecutor} from "@structures/index.js";
import {ApplicationCommandType} from "discord-api-types/v10";

export class MessageCommand extends Command {
    public override type: ApplicationCommandType = ApplicationCommandType.Message;
    public override executor: MessageCommandExecutor | undefined;

    constructor(options?: {data?: CommandData, executor?: MessageCommandExecutor}) {
        super(options);

        if(options?.executor)
            this.executor = options.executor;
    }

    public setExecutor(executor: MessageCommandExecutor) {
        this.executor = executor;
        return this;
    }
}
