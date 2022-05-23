import {JsonConvertable} from "../json/JsonConvertable.js";
import {APIActionRowComponent, APIButtonComponent, APISelectMenuComponent} from "discord-api-types/v10.js";
import {Button} from "./Button.js";

type ComponentUnion = Button | APIButtonComponent | APISelectMenuComponent;

export class ActionRow extends JsonConvertable {
    public data: APIActionRowComponent<APIButtonComponent | APISelectMenuComponent> = {type: 1, components: []};

    public setComponents(components: ComponentUnion[]) {
        this.data.components = components.map(component => {
            if (component instanceof JsonConvertable)
                return component.toJson();
            else
                return component;
        });
        return this;
    }

    public addComponent(component: ComponentUnion) {
        if (component instanceof JsonConvertable)
            this.data.components.push(component.toJson());
        else
            this.data.components.push(component);
        return this;
    }

    public addComponents(components: ComponentUnion[]) {
        for (const component of components)
            this.addComponent(component);
        return this;
    }

    public toJson() {
        return this.data;
    }
}
