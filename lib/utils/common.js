"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommandUsed = exports.isJsonFile = exports.packageExists = void 0;
const cli_flag_1 = require("./cli-flag");
const path_1 = __importDefault(require("path"));
const packageExists = (packageName) => {
    try {
        require(packageName);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.packageExists = packageExists;
const isJsonFile = (filePath) => {
    return path_1.default.extname(filePath).toLocaleLowerCase() === '.json';
};
exports.isJsonFile = isJsonFile;
const isCommandUsed = (args) => !!cli_flag_1.commands.find((cmd) => {
    return args.includes(cmd.name);
});
exports.isCommandUsed = isCommandUsed;
