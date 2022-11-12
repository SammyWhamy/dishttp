import {expect} from "chai";
import {suite, test} from "mocha";
import {InteractionResponseType} from "discord-api-types/v10";
import {MessageResponse} from "../../../dist/index.js";

suite("MessageResponse", () => {
    test("Type", () => {
        const response = new MessageResponse();
        expect(response.toJson().type).to.equal(InteractionResponseType.ChannelMessageWithSource);
    });
});
