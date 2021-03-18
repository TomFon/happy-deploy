"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
function default_1(option) {
    const tmpFileName = 'release-package.zip';
    const config = Object.assign(Object.assign({}, option), { zipPath: '', absLocalPath: '', tmpPath: path_1.join(__dirname, '../../tmp/' + tmpFileName) });
    // mkdir tmp directory
    if (!fs_1.existsSync(config.tmpPath)) {
        fs_1.mkdirSync(path_1.dirname(config.tmpPath));
    }
    // absolute path
    config.absLocalPath = path_1.join(process.cwd(), config.localPath);
    config.zipPath = path_1.posix.join(config.remotePath, tmpFileName);
    if (!fs_1.existsSync(config.absLocalPath)) {
        throw new Error('localPath does not exist');
    }
    return config;
}
exports.default = default_1;
