import {ButtonComponentExecutor, ComponentHandler, ComponentHandlerData,} from "./ComponentHandler.js";
import {ComponentType} from "discord-api-types/v10";

export class ButtonComponentHandler extends ComponentHandler {
    public override type: ComponentType = ComponentType.Button;
    public override executor: ButtonComponentExecutor | undefined;

    constructor(options?: {data?: ComponentHandlerData, handler?: ButtonComponentExecutor}) {
        super(options);

        if(options?.handler)
            this.executor = options.handler;
    }

    public setHandler(handler: ButtonComponentExecutor) {
        this.executor = handler;
        return this;
    }
}
