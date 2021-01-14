#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_config_1 = __importDefault(require("./utils/init-config"));
const compress_1 = __importDefault(require("./utils/compress"));
const upload_1 = __importDefault(require("./utils/upload"));
const parser_1 = __importDefault(require("./utils/parser"));
const common_1 = require("./utils/common");
const verify_1 = __importDefault(require("./utils/verify"));
const run = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [, , ...rawArgs] = process.argv;
            // analysis process argv
            const parsedArgs = parser_1.default(rawArgs);
            // cli command
            const commandIsUsed = common_1.isCommandUsed(rawArgs);
            if (commandIsUsed) {
                return;
            }
            verify_1.default(parsedArgs);
            const happyDeployConfig = init_config_1.default(parsedArgs);
            console.log(happyDeployConfig);
            yield compress_1.default(happyDeployConfig);
            yield upload_1.default(happyDeployConfig);
        }
        catch (err) {
            console.log(err);
        }
    });
};
run();
