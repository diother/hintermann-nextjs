/* Custom snowflake: 41bits timestamp + 7 bits random */

import { z } from "zod";

export const SnowflakeSchema = z
    .instanceof(Buffer)
    .refine((buffer) => buffer.length === 6);

export const Snowflake = {
    epoch: 1704067200000n,
    sequence: 0,
    lastTimestamp: BigInt(-1),

    generate: function () {
        const timestamp = BigInt(Date.now()) - this.epoch;

        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1) % 128;
        } else {
            this.sequence = Math.floor(Math.random() * 128);
            this.lastTimestamp = timestamp;
        }

        const id = (timestamp << 7n) | BigInt(this.sequence);
        const tempBuffer = Buffer.alloc(8);
        const buffer = Buffer.alloc(6);

        tempBuffer.writeBigInt64BE(id);
        tempBuffer.copy(buffer, 0, 2);

        return buffer;
    },
};
