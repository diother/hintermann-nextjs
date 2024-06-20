/* Custom snowflake: 41bits timestamp + 7 bits random */

import { z } from "zod";

export const Snowflake = {
    epoch: 1704067200000n,
    sequence: 0,
    lastTimestamp: BigInt(-1),

    generate: (): Buffer => {
        const timestamp = BigInt(Date.now()) - Snowflake.epoch;
        const sequence =
            timestamp === Snowflake.lastTimestamp
                ? (Snowflake.sequence + 1) % 128
                : Math.floor(Math.random() * 128);

        Snowflake.lastTimestamp = timestamp;
        Snowflake.sequence = sequence;

        const id = (timestamp << 7n) | BigInt(sequence);
        const tempBuffer = Buffer.alloc(8);
        tempBuffer.writeBigInt64BE(id);
        const buffer = Buffer.alloc(6);
        tempBuffer.copy(buffer, 0, 2);
        return buffer;
    },
};

export const SnowflakeSchema = z
    .instanceof(Buffer)
    .refine((buffer) => buffer.length === 6);
