import {verifyKey} from "../../util/index.js";
import {JsonResponse} from "../../structures/index.js";
import {JSON_HEADER} from "../../constants/index.js";
import {Router} from "itty-router";

export async function handle(router: Router<Request, {}>, request: Request, env: { [key: string]: string }): Promise<JsonResponse> {
    if(request.method === "POST") {
        const valid = await verifyPost(request, env);
        if(!valid) {
            return new JsonResponse({error: 'Unauthorized'}, {headers: JSON_HEADER, status: 401});
        }
    }

    return router.handle(request, env);
}

export async function verifyPost(request: Request, env: { [key: string]: string }): Promise<boolean> {
    const signature = request.headers.get('x-signature-ed25519');
    const timestamp = request.headers.get('x-signature-timestamp');

    if(!signature || !timestamp || !env.DISCORD_PUBLIC_KEY)
        return false;

    const body = await request.clone().arrayBuffer();
    return verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
}

export const notFound = () => new JsonResponse({error: 'Not found'}, {headers: JSON_HEADER, status: 404});
export const badRequest = () => new JsonResponse({error: 'Bad request'}, {headers: JSON_HEADER, status: 400});
