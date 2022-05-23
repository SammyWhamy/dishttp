import {ComponentHandler, ComponentHandlerData, SelectMenuComponentExecutor} from "./ComponentHandler.js";
import {ComponentType} from "discord-api-types/v10";

export class SelectMenuComponentHandler extends ComponentHandler {
    public override type: ComponentType = ComponentType.SelectMenu;
    public override executor: SelectMenuComponentExecutor | undefined;

    constructor(options?: {data?: ComponentHandlerData, handler?: SelectMenuComponentExecutor}) {
        super(options);

        if(options?.handler)
            this.executor = options.handler;
    }

    public setHandler(handler: SelectMenuComponentExecutor) {
        this.executor = handler;
        return this;
    }
}
