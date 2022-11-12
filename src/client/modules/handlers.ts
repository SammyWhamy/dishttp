import {
    ButtonComponentHandler,
    ChatCommand,
    Command,
    ComponentHandler,
    MessageCommand,
    ModalHandler,
    SelectMenuComponentHandler,
    UserCommand
} from "@structures/index.js";

export class Handlers {
    public chatCommands = new Map<string, ChatCommand>();
    public userCommands = new Map<string, UserCommand>();
    public messageCommands = new Map<string, MessageCommand>();
    public buttonComponents = new Map<string, ButtonComponentHandler>();
    public selectMenuComponents = new Map<string, SelectMenuComponentHandler>();
    public modalSubmits = new Map<string, ModalHandler>();
    public verbose: (body: any) => void = () => {};

    public addHandler(handler: ComponentHandler | ModalHandler | Command): void {
        if(handler instanceof ChatCommand)
            this.chatCommands.set(handler.data.name, handler);
        else if(handler instanceof UserCommand)
            this.userCommands.set(handler.data.name, handler);
        else if(handler instanceof MessageCommand)
            this.messageCommands.set(handler.data.name, handler);
        else if(handler instanceof ButtonComponentHandler)
            this.buttonComponents.set(handler.customId, handler);
        else if(handler instanceof SelectMenuComponentHandler)
            this.selectMenuComponents.set(handler.customId, handler);
        else if(handler instanceof ModalHandler)
            this.modalSubmits.set(handler.customId, handler);
    }

    public setVerboseHandler(handler: (body: any) => void): void {
        this.verbose = handler;
    }

    public addHandlers(handlers: (ComponentHandler | ModalHandler | Command)[]): void {
        for(const handler of handlers)
            this.addHandler(handler);
    }
}
