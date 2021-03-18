#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const run_1 = __importDefault(require("./utils/run"));
const init_1 = __importDefault(require("./utils/init"));
// eslint-disable-next-line no-unused-expressions
yargs_1.default
    .option('config', {
    alias: 'c',
    describe: 'upload file config',
    default: 'hd.json'
})
    .command('run', 'start upload file', function (yargs) {
    return yargs;
}, function (argv) {
    run_1.default(argv.config);
}).command('init', 'init config file', function (yargs) {
    return yargs;
}, function () {
    console.log('22');
    init_1.default();
})
    .help()
    .argv;
