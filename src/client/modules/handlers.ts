import {
    ButtonComponentHandler,
    ChatCommand, Command, ComponentHandler,
    MessageCommand, ModalHandler,
    SelectMenuComponentHandler,
    UserCommand
} from "../../structures/index.js";

export class Handlers {
    public commands = {
        chat: new Map<string, ChatCommand>(),
        user: new Map<string, UserCommand>(),
        message: new Map<string, MessageCommand>(),
    }
    public components = {
        button: new Map<string, ButtonComponentHandler>(),
        selectMenu: new Map<string, SelectMenuComponentHandler>(),
    }
    public modal = new Map<string, ModalHandler>();

    public addHandler(handler: ComponentHandler | ModalHandler | Command): void {
        if(handler instanceof ChatCommand)
            this.commands.chat.set(handler.data.name, handler);
        else if(handler instanceof UserCommand)
            this.commands.user.set(handler.data.name, handler);
        else if(handler instanceof MessageCommand)
            this.commands.message.set(handler.data.name, handler);
        else if(handler instanceof ButtonComponentHandler)
            this.components.button.set(handler.customId, handler);
        else if(handler instanceof SelectMenuComponentHandler)
            this.components.selectMenu.set(handler.customId, handler);
        else if(handler instanceof ModalHandler)
            this.modal.set(handler.customId, handler);
    }

    public addHandlers(handlers: (ComponentHandler | ModalHandler | Command)[]): void {
        for(const handler of handlers)
            this.addHandler(handler);
    }
}
