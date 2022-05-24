export function isSnowflake(value: any): boolean {
    const bigint = BigInt(value);
    return 1e17 <= bigint && bigint <= 1e19;
}
