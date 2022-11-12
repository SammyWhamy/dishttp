import '../../../dist/nodeInit.js';
import {expect} from 'chai';
import {ButtonStyle, ComponentType} from "discord-api-types/v10";
import {suite, test} from 'mocha';
import {Button} from "../../../dist/index.js";


suite("Button", () => {
    test('Default initialization', () => {
        const button = new Button();
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});
    });

    test('Set style', () => {
        const button = new Button();

        button.setStyle(ButtonStyle.Primary);
        expect(button.data).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Primary});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Primary});

        button.setStyle(ButtonStyle.Secondary);
        expect(button.data).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Secondary});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Secondary});

        button.setStyle(ButtonStyle.Success);
        expect(button.data).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Success});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Success});

        button.setStyle(ButtonStyle.Danger);
        expect(button.data).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Danger});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Danger});

        button.setStyle(ButtonStyle.Link);
        expect(button.data).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Link});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, style: ButtonStyle.Link});
    });

    test('Set label', () => {
        const button = new Button();

        button.setLabel('Label');
        expect(button.data).to.deep.equal({type: ComponentType.Button, label: 'Label'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, label: 'Label'});

        button.setLabel(null);
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});

        button.setLabel('Label 2');
        expect(button.data).to.deep.equal({type: ComponentType.Button, label: 'Label 2'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, label: 'Label 2'});

        button.setLabel(null);
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});
    });

    test('Set emoji', () => {
        const button = new Button();

        button.setEmoji({name: 'Emoji', id: '1234567890'});
        expect(button.data).to.deep.equal({type: ComponentType.Button, emoji: {name: 'Emoji', id: '1234567890'}});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, emoji: {name: 'Emoji', id: '1234567890'}});

        button.setEmoji(null);
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});

        button.setEmoji({name: 'Emoji 2', id: '0987654321'});
        expect(button.data).to.deep.equal({type: ComponentType.Button, emoji: {name: 'Emoji 2', id: '0987654321'}});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, emoji: {name: 'Emoji 2', id: '0987654321'}});

        button.setEmoji(null);
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});

        button.setEmoji({name: 'Emoji 3', id: '1234567890'});
        expect(button.data).to.deep.equal({type: ComponentType.Button, emoji: {name: 'Emoji 3', id: '1234567890'}});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, emoji: {name: 'Emoji 3', id: '1234567890'}});
    });

    test('Set url', () => {
        const button = new Button();

        button.setUrl('https://example.com');
        expect(button.data).to.deep.equal({type: ComponentType.Button, url: 'https://example.com'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, url: 'https://example.com'});

        button.setUrl(null);
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});

        button.setUrl('https://example.com/2');
        expect(button.data).to.deep.equal({type: ComponentType.Button, url: 'https://example.com/2'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, url: 'https://example.com/2'});

        button.setUrl(null);
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});

        button.setUrl('https://example.com/3');
        expect(button.data).to.deep.equal({type: ComponentType.Button, url: 'https://example.com/3'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, url: 'https://example.com/3'});
    });

    test('Set disabled', () => {
        const button = new Button();

        button.setDisabled(true);
        expect(button.data).to.deep.equal({type: ComponentType.Button, disabled: true});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, disabled: true});

        button.setDisabled(false);
        expect(button.data).to.deep.equal({type: ComponentType.Button, disabled: false});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, disabled: false});

        button.setDisabled(true);
        expect(button.data).to.deep.equal({type: ComponentType.Button, disabled: true});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, disabled: true});
    });

    test('Set custom id', () => {
        const button = new Button();

        button.setCustomId('custom-id');
        expect(button.data).to.deep.equal({type: ComponentType.Button, custom_id: 'custom-id'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, custom_id: 'custom-id'});

        button.setCustomId(null);
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});

        button.setCustomId('custom-id-2');
        expect(button.data).to.deep.equal({type: ComponentType.Button, custom_id: 'custom-id-2'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, custom_id: 'custom-id-2'});

        button.setCustomId(null);
        expect(button.data).to.deep.equal({type: ComponentType.Button});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button});

        button.setCustomId('custom-id-3');
        expect(button.data).to.deep.equal({type: ComponentType.Button, custom_id: 'custom-id-3'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, custom_id: 'custom-id-3'});
    });

    test('Full test', () => {
        const button = new Button();

        button.setLabel('Label');
        button.setEmoji({name: 'Emoji', id: '1234567890'});
        button.setUrl('https://example.com');
        button.setDisabled(true);
        button.setCustomId('custom-id');

        expect(button.data).to.deep.equal({type: ComponentType.Button, label: 'Label', emoji: {name: 'Emoji', id: '1234567890'}, url: 'https://example.com', disabled: true, custom_id: 'custom-id'});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, label: 'Label', emoji: {name: 'Emoji', id: '1234567890'}, url: 'https://example.com', disabled: true, custom_id: 'custom-id'});

        button.setLabel(null);
        button.setEmoji(null);
        button.setUrl(null);
        button.setDisabled(false);
        button.setCustomId(null);

        expect(button.data).to.deep.equal({type: ComponentType.Button, disabled: false});
        expect(button.toJson()).to.deep.equal({type: ComponentType.Button, disabled: false});

        const button2 = new Button();

        button2.setLabel('Label 2');
        button2.setEmoji({name: 'Emoji 2', id: '0987654321'});
        button2.setUrl('https://example.com/2');
        button2.setDisabled(false);
        button2.setCustomId('custom-id-2');

        expect(button2.data).to.deep.equal({type: ComponentType.Button, label: 'Label 2', emoji: {name: 'Emoji 2', id: '0987654321'}, url: 'https://example.com/2', disabled: false, custom_id: 'custom-id-2'});
        expect(button2.toJson()).to.deep.equal({type: ComponentType.Button, label: 'Label 2', emoji: {name: 'Emoji 2', id: '0987654321'}, url: 'https://example.com/2', disabled: false, custom_id: 'custom-id-2'});
    });
});
