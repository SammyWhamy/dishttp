import {ComponentHandler, ComponentHandlerData, SelectMenuComponentExecutor} from "@structures/index.js";
import {ComponentType} from "discord-api-types/v10";

export class SelectMenuComponentHandler extends ComponentHandler {
    public override type: ComponentType = ComponentType.SelectMenu;
    public override executor: SelectMenuComponentExecutor | undefined;

    constructor(options?: {data?: ComponentHandlerData, executor?: SelectMenuComponentExecutor}) {
        super(options);

        if(options?.executor)
            this.executor = options.executor;
    }

    public setHandler(handler: SelectMenuComponentExecutor) {
        this.executor = handler;
        return this;
    }
}
