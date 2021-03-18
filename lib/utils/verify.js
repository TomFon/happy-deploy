"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const path_1 = __importDefault(require("path"));
const fs_1 = __importStar(require("fs"));
const cli_flag_1 = require("./cli-flag");
function default_1(config) {
    // get args from entry json file
    const entryPath = path_1.default.join(process.cwd(), config);
    if (!common_1.isJsonFile(entryPath)) {
        throw new Error('the config is not json file');
    }
    if (!fs_1.existsSync(entryPath)) {
        throw new Error('the config path is not exist');
    }
    try {
        const jsonData = fs_1.default.readFileSync(entryPath, 'utf-8');
        const configData = JSON.parse(jsonData);
        // verity opts
        cli_flag_1.core.forEach((item) => {
            const key = item.name;
            const required = item.required;
            const rules = item.rules;
            const val = configData[key];
            if (required && (val === '' || val === undefined || val === null)) {
                throw new Error(`${key} is required and the type required ${typeof item.type()}`);
            }
            if (rules && !rules.test(val)) {
                throw new Error(`the ${key} RegExp is ${rules}`);
            }
        });
        return configData;
    }
    catch (err) {
        console.log(err);
    }
}
exports.default = default_1;
