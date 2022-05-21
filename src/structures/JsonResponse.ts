import {JSON_HEADERS} from "../constants/index.js";

export class JsonResponse extends Response {
    constructor(body: object, init?: object) {
        const jsonBody = JSON.stringify(body);
        super(jsonBody, init || JSON_HEADERS);
    }
}
