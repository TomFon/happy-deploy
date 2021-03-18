"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { commands } from './cli-flag'
const yargs_1 = __importDefault(require("yargs"));
const run_1 = __importDefault(require("./run"));
function default_1() {
    const test = yargs_1.default
        .command('run', 'start upload file', function (yargs) {
        return yargs.option('config', {
            alias: 'c',
            describe: 'upload file config',
            default: 'hd.json',
            demandOption: true
        });
    }, function (argv) {
        run_1.default(argv.config);
    })
        .help()
        .argv;
    console.log(test);
}
exports.default = default_1;
