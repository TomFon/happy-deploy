"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const cli_flag_1 = require("./cli-flag");
function default_1(opts) {
    // clean opts undefine value
    for (const key in opts) {
        if (opts[key] === undefined) {
            delete opts[key];
        }
    }
    // get args from entry json file
    if (opts.entry) {
        const entryPath = path_1.default.join(process.cwd(), opts.entry);
        if (common_1.isJsonFile(entryPath) && fs_1.existsSync(entryPath)) {
            opts = Object.assign(Object.assign({}, require(entryPath)), opts);
        }
    }
    // vertry opts
    cli_flag_1.core.forEach((item) => {
        const key = item.name;
        const required = item.required;
        const rules = item.rules;
        const val = opts[key];
        if (required && (val === '' || val === undefined || val === null)) {
            throw new Error(`${key} is required and the type required ${typeof item.type()}`);
        }
        if (rules && !rules.test(val)) {
            throw new Error(`the ${key} RegExp is ${rules}`);
        }
    });
    return opts;
}
exports.default = default_1;
