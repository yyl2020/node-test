import * as assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import {spawn} from 'node:child_process';

/**
 * Returns a string with the contents of `readableStream`.
 */
async function readableStreamToString(readableStream) {
    const reader = readableStream.getReader();
    try {
        let result = '';
        while (true) {
            const {done, value} = await reader.read();
            if (done) {
                return result; // (A)
            }
            result += value;
        }
    } finally {
        reader.releaseLock(); // (B)
    }
}

const childProcess = spawn(
    'echo "Hello, how are you?"',
    {
        shell: true,
        stdio: ['ignore', 'pipe', 'inherit'],
    }
);
const stdout = Readable.toWeb(childProcess.stdout.setEncoding('utf-8'))
assert.equal(
    await readableStreamToString(stdout),
    'Hello, how are you?\n' // (C)
)
console.log('After spawn()');