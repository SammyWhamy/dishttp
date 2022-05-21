import {Command, CommandData, UserCommandExecutor} from "./Command.js";
import {ApplicationCommandType} from "discord-api-types/v10";

export class UserCommand extends Command {
    public override type: ApplicationCommandType = ApplicationCommandType.User;
    public override executor: UserCommandExecutor | undefined;

    constructor(data?: CommandData | null, executor?: UserCommandExecutor) {
        super(data);

        if(executor)
            this.executor = executor;
    }

    public setExecutor(executor: UserCommandExecutor) {
        this.executor = executor;
        return this;
    }
}
