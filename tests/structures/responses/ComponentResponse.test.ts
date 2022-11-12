import {expect} from "chai";
import {suite, test} from "mocha";
import {InteractionResponseType} from "discord-api-types/v10";
import {ComponentResponse} from "../../../dist/index.js";

suite("ComponentResponse", () => {
    test("Type", () => {
        const response = new ComponentResponse();
        expect(response.toJson().type).to.equal(InteractionResponseType.UpdateMessage);
    });
});
