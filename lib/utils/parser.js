"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { commands } from './cli-flag'
const yargs_1 = __importDefault(require("yargs"));
function default_1() {
    const argv = yargs_1.default.argv;
    console.log(argv);
    return {};
}
exports.default = default_1;
