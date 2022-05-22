import {verify} from "../lib/nacl.js";

function valueToUint8Array(value: ArrayBuffer | string, format?: string) {
    if (value == null)
        return new Uint8Array();

    if (typeof value === 'string') {
        if (format !== 'hex')
            return new TextEncoder().encode(value);

        const matches = value.match(/.{1,2}/g);
        if (matches == null)
            throw new Error('Value is not a valid hex string');

        const hexVal = matches.map((byte) => parseInt(byte, 16));
        return new Uint8Array(hexVal);
    }

    return new Uint8Array(value);
}

function concatUint8Arrays(arr1: Uint8Array, arr2: Uint8Array): Uint8Array {
    const merged = new Uint8Array(arr1.length + arr2.length);
    merged.set(arr1);
    merged.set(arr2, arr1.length);
    return merged;
}

export function verifyKey(body: ArrayBuffer, signature: string, timestamp: string, clientPublicKey: string): boolean {
    try {
        const timestampData = valueToUint8Array(timestamp);
        const bodyData = valueToUint8Array(body);
        const message = concatUint8Arrays(timestampData, bodyData);

        const signatureData = valueToUint8Array(signature, 'hex');
        const publicKeyData = valueToUint8Array(clientPublicKey, 'hex');
        return verify(message, signatureData, publicKeyData);
    } catch (ex) {
        console.error('Invalid verifyKey parameters', ex);
        return false;
    }
}
