import '../../../dist/nodeInit.js';
import {expect} from 'chai';
import {suite, test} from 'mocha';
import {ActionRow, BaseMessageResponse, Embed} from "../../../dist/index.js";

suite("BaseMessageResponse", () => {
    test("Default initialization", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);

        expect(baseMessageResponse.toJson()).to.deep.equal({
            type: -1,
            data: {
                tts: false,
                content: undefined,
                flags: 0,
                embeds: [],
                components: [],
            }
        });
    });

    test("Data initialization", () => {
        const responseTts = new BaseMessageResponse(-1, {tts: true});
        expect(responseTts.toJson()).to.deep.equal({type: -1, data: {tts: true, content: undefined, flags: 0, embeds: [], components: []}});
        const responseContent = new BaseMessageResponse(-1, {content: "Hello World!"});
        expect(responseContent.toJson()).to.deep.equal({type: -1, data: {tts: false, content: "Hello World!", flags: 0, embeds: [], components: []}});
        const responseEphemeral = new BaseMessageResponse(-1, {ephemeral: true});
        expect(responseEphemeral.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 64, embeds: [], components: []}});
        const responseSuppressEmbeds = new BaseMessageResponse(-1, {suppressEmbeds: true});
        expect(responseSuppressEmbeds.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 4, embeds: [], components: []}});
        const responseEmbeds = new BaseMessageResponse(-1, {embeds: [new Embed()]});
        expect(responseEmbeds.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [{}], components: []}});
        const responseComponents = new BaseMessageResponse(-1, {components: [new ActionRow()]});
        expect(responseComponents.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [], components: [{components: [], type: 1}]}});

        const responseFull = new BaseMessageResponse(-1, {
            tts: true,
            content: "Hello World!",
            ephemeral: true,
            suppressEmbeds: true,
            embeds: [new Embed()],
            components: [new ActionRow()],
        });

        expect(responseFull.toJson()).to.deep.equal({
            type: -1,
            data: {
                tts: true,
                content: "Hello World!",
                flags: 68,
                embeds: [{}],
                components: [{components: [], type: 1}],
            },
        });
    });

    test("Set TTS", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.setTTS(true);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: true, content: undefined, flags: 0, embeds: [], components: []}});
    });

    test("Set Content", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.setContent("Hello World!");
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: "Hello World!", flags: 0, embeds: [], components: []}});
    });

    test("Set Ephemeral", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.setEphemeral(true);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 64, embeds: [], components: []}});
    });

    test("Set Suppress Embeds", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.suppressEmbeds(true);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 4, embeds: [], components: []}});
    });

    test("Set Embeds", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.setEmbeds([new Embed()]);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [{}], components: []}});

        baseMessageResponse.setEmbeds([]);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [], components: []}});
    });

    test("Add embed", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.addEmbed(new Embed());
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [{}], components: []}});

        baseMessageResponse.addEmbed(new Embed());
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [{}, {}], components: []}});
    });

    test("Add embeds", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.addEmbeds([new Embed(), new Embed()]);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [{}, {}], components: []}});

        baseMessageResponse.addEmbeds([]);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [{}, {}], components: []}});
    });

    test("Set Components", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.setComponents([new ActionRow()]);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [], components: [{components: [], type: 1}]}});

        baseMessageResponse.setComponents([]);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [], components: []}});
    });

    test("Add component", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.addComponent(new ActionRow());
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [], components: [{components: [], type: 1}]}});

        baseMessageResponse.addComponent(new ActionRow());
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [], components: [{components: [], type: 1}, {components: [], type: 1}]}});
    });

    test("Add components", () => {
        const baseMessageResponse = new BaseMessageResponse(-1);
        baseMessageResponse.addComponents([new ActionRow(), new ActionRow()]);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [], components: [{components: [], type: 1}, {components: [], type: 1}]}});

        baseMessageResponse.addComponents([]);
        expect(baseMessageResponse.toJson()).to.deep.equal({type: -1, data: {tts: false, content: undefined, flags: 0, embeds: [], components: [{components: [], type: 1}, {components: [], type: 1}]}});
    });
});
