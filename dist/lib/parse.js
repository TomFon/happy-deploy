"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const utils_1 = __importDefault(require("./utils"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const parser = new commander_1.default.Command();
const core = [
    {
        name: 'entry',
        type: String,
        defaultValue: 'ltf.json',
        description: 'the config file of your application'
    },
    {
        name: 'host',
        type: String,
        description: 'server ip address'
    },
    {
        name: 'port',
        type: String,
        defaultValue: '22',
        description: 'server port'
    },
    {
        name: 'username',
        type: String,
        alias: 'u',
        description: 'server username'
    },
    {
        name: 'password',
        type: String,
        alias: 'p',
        description: 'server password'
    },
    {
        name: 'localPath',
        type: String,
        alias: 'l',
        description: 'local file path'
    },
    {
        name: 'remotePath',
        type: String,
        alias: 'r',
        description: 'remote file path'
    },
    {
        name: 'subdir',
        alias: 'd',
        type: String,
        defaultValue: '',
        description: 'zip file subdir'
    }
];
core.reduce((parserInstance, option) => {
    const flags = option.alias ? `-${option.alias}, --${option.name} <value>` : `--${option.name} <value>`;
    parserInstance.option(flags, option.description, option.type, option.defaultValue);
    return parserInstance;
}, parser);
parser.parse(process.argv);
let opts = parser.opts();
// clean opts undefine value
for (const key in opts) {
    if (opts[key] === undefined) {
        delete opts[key];
    }
}
let entryJson = opts;
// get args from json file
if (opts.entry) {
    const entryPath = path_1.default.join(process.cwd(), opts.entry);
    console.log(utils_1.default.isJsonFile(entryPath), fs_1.existsSync(entryPath));
    if (utils_1.default.isJsonFile(entryPath) && fs_1.existsSync(entryPath)) {
        entryJson = Object.assign(Object.assign({}, require(entryPath)), entryJson);
        opts = entryJson;
    }
}
// vertry opts
core.forEach((item) => {
    const key = item.name;
    if (entryJson[key] === undefined || entryJson[key].constructor !== item.type) {
        throw new Error(`${key} is required and the type required ${typeof item.type()}`);
    }
});
exports.default = opts;
