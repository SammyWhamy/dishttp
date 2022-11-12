import '../../../dist/nodeInit.js';
import {expect} from 'chai';
import {ComponentType} from "discord-api-types/v10";
import {suite, test} from 'mocha';
import {ActionRow, Button} from "../../../dist/index.js";

suite("ActionRow", () => {
    test('Default initialization', () => {
        const actionRow = new ActionRow();
        expect(actionRow.data).to.deep.equal({type: ComponentType.ActionRow, components: []});
        expect(actionRow.toJson()).to.deep.equal({type: ComponentType.ActionRow, components: []});
    });

    test('Set components', () => {
        const actionRow = new ActionRow();
        const button = new Button();

        actionRow.setComponents([button]);
        expect(actionRow.data).to.deep.equal({type: ComponentType.ActionRow, components: [button.data]});
        expect(actionRow.toJson()).to.deep.equal({type: ComponentType.ActionRow, components: [button.data]});

        actionRow.setComponents([]);
        expect(actionRow.data).to.deep.equal({type: ComponentType.ActionRow, components: []});
        expect(actionRow.toJson()).to.deep.equal({type: ComponentType.ActionRow, components: []});
    });

    test('Add components', () => {
        const actionRow = new ActionRow();
        const button = new Button();

        actionRow.addComponents([button]);
        expect(actionRow.data).to.deep.equal({type: ComponentType.ActionRow, components: [button.data]});
        expect(actionRow.toJson()).to.deep.equal({type: ComponentType.ActionRow, components: [button.data]});

        actionRow.addComponents([button, button]);
        expect(actionRow.data).to.deep.equal({type: ComponentType.ActionRow, components: [button.data, button.data, button.data]});
        expect(actionRow.toJson()).to.deep.equal({type: ComponentType.ActionRow, components: [button.data, button.data, button.data]});
    });

    test('Add component', () => {
        const actionRow = new ActionRow();
        const button = new Button();

        actionRow.addComponent(button);
        expect(actionRow.data).to.deep.equal({type: ComponentType.ActionRow, components: [button.data]});
        expect(actionRow.toJson()).to.deep.equal({type: ComponentType.ActionRow, components: [button.data]});

        actionRow.addComponent(button);
        expect(actionRow.data).to.deep.equal({type: ComponentType.ActionRow, components: [button.data, button.data]});
        expect(actionRow.toJson()).to.deep.equal({type: ComponentType.ActionRow, components: [button.data, button.data]});
    })
});
