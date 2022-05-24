import {Command, CommandData, UserCommandExecutor} from "@structures/index.js";
import {ApplicationCommandType} from "discord-api-types/v10";

export class UserCommand extends Command {
    public override type: ApplicationCommandType = ApplicationCommandType.User;
    public override executor: UserCommandExecutor | undefined;

    constructor(options?: {data?: CommandData, executor?: UserCommandExecutor}) {
        super(options);

        if(options?.executor)
            this.executor = options.executor;
    }

    public setExecutor(executor: UserCommandExecutor) {
        this.executor = executor;
        return this;
    }
}
