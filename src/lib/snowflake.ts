/* Custom snowflake: 41bits timestamp + 7 bits random */

import { z } from "zod";

const generateRandomSequence = (): number => Math.floor(Math.random() * 128);

const calculateTimestamp = (epoch: bigint): bigint =>
    BigInt(Date.now()) - epoch;

const generateSnowflakeId = (timestamp: bigint, sequence: number): bigint =>
    (timestamp << 7n) | BigInt(sequence);

const generateSnowflakeBuffer = (id: bigint): Buffer => {
    const tempBuffer = Buffer.alloc(8);
    tempBuffer.writeBigInt64BE(id);
    const buffer = Buffer.alloc(6);
    tempBuffer.copy(buffer, 0, 2);
    return buffer;
};

export const Snowflake = {
    epoch: 1704067200000n,
    sequence: 0,
    lastTimestamp: BigInt(-1),

    generate: (): Buffer => {
        const timestamp = calculateTimestamp(Snowflake.epoch);
        const sequence =
            timestamp === Snowflake.lastTimestamp
                ? (Snowflake.sequence + 1) % 128
                : generateRandomSequence();

        Snowflake.lastTimestamp = timestamp;
        Snowflake.sequence = sequence;

        const id = generateSnowflakeId(timestamp, sequence);
        return generateSnowflakeBuffer(id);
    },
};

export const SnowflakeSchema = z
    .instanceof(Buffer)
    .refine((buffer) => buffer.length === 6);
