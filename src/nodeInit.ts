import {Response, Request, default as fetch} from 'node-fetch';

// @ts-ignore
global.Response ??= Response;
// @ts-ignore
global.Request ??= Request;
// @ts-ignore
global.fetch ??= fetch;
