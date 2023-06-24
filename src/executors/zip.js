import { getRealPath } from "../utils/utils.js";
import { pipeline } from 'stream/promises';
import { createGzip, createGunzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

const compress = async (directory, filename, newFilename) => {
  const oldPath = await getRealPath(directory, filename);
  const newPath = await getRealPath(directory, newFilename, false);
  const readable = createReadStream(oldPath);
  const writeable = createWriteStream(newPath);
  await pipeline(readable,
        createGzip(),
        writeable);
  return { message: `File ${filename} successfully compressed.`}
  
};

const decompress = async (directory, filename, newFilename) => {
  const oldPath = await getRealPath(directory, filename);
  const newPath = await getRealPath(directory, newFilename, false);
  const readable = createReadStream(oldPath);
  const writeable = createWriteStream(newPath);
  await pipeline(readable,
    createGunzip(),
    writeable);
  return { message: `File ${filename} successfully decompressed.`}
}

export { compress, decompress };