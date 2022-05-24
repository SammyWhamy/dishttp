import {ButtonComponentExecutor, ComponentHandler, ComponentHandlerData,} from "@structures/index.js";
import {ComponentType} from "discord-api-types/v10";

export class ButtonComponentHandler extends ComponentHandler {
    public override type: ComponentType = ComponentType.Button;
    public override executor: ButtonComponentExecutor | undefined;

    constructor(options?: {data?: ComponentHandlerData, executor?: ButtonComponentExecutor}) {
        super(options);

        if(options?.executor)
            this.executor = options.executor;
    }

    public setHandler(handler: ButtonComponentExecutor) {
        this.executor = handler;
        return this;
    }
}
