import {Command, CommandData, MessageCommandExecutor} from "./Command.js";
import {ApplicationCommandType} from "discord-api-types/v10";

export class MessageCommand extends Command {
    public override type: ApplicationCommandType = ApplicationCommandType.Message;
    public override executor: MessageCommandExecutor | undefined;

    constructor(data?: CommandData | null, executor?: MessageCommandExecutor) {
        super(data);

        if(executor)
            this.executor = executor;
    }

    public setExecutor(executor: MessageCommandExecutor) {
        this.executor = executor;
        return this;
    }
}
