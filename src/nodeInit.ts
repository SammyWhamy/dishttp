import {default as fetch, Request, Response} from 'node-fetch';

// @ts-ignore
global.Response ??= Response;
// @ts-ignore
global.Request ??= Request;
// @ts-ignore
global.fetch ??= fetch;
