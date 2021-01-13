"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
function default_1(config) {
    return new Promise((resolve, reject) => {
        const output = fs_1.default.createWriteStream(config.tmpPath);
        const archive = archiver_1.default('zip');
        output.on('close', function () {
            const bytes = archive.pointer();
            console.log('total bytes :' + bytes);
            console.log('archiver has been finalized and the output file descriptor has closed.');
            resolve();
        });
        output.on('end', function () {
            console.log('Data has been drained');
        });
        archive.on('error', function (err) {
            reject(err);
        });
        archive.pipe(output);
        // if (config.isDirectory) {
        //   archive.directory(config.realLocalPath, config.inCludeDirectory ? config.basename : false)
        // } else {
        //   archive.append(fs.createReadStream(config.realLocalPath), { name: config.basename })
        // }
        archive.directory(config.realLocalPath, config.subdir ? config.subdir : false);
        archive.finalize();
    });
}
exports.default = default_1;
