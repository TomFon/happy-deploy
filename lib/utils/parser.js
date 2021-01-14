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
const commander_1 = __importDefault(require("commander"));
const cli_flag_1 = require("./cli-flag");
function default_1(args) {
    const parser = new commander_1.default.Command();
    parser.name('hd').usage('[command] [options]');
    // cli command
    console.log(args);
    cli_flag_1.commands.reduce((parserInstance, cmd) => {
        parserInstance
            .command(cmd.name)
            .description(cmd.description)
            .usage(cmd.usage)
            .allowUnknownOption(true)
            .action(() => __awaiter(this, void 0, void 0, function* () {
            console.log('action');
        }));
        return parserInstance;
    }, parser);
    // cli options
    cli_flag_1.core.reduce((parserInstance, option) => {
        const flags = option.alias ? `-${option.alias}, --${option.name} <value>` : `--${option.name} <value>`;
        parserInstance.option(flags, option.description, option.type, option.defaultValue);
        return parserInstance;
    }, parser);
    const result = parser.parse(args, { from: 'user' });
    // get argv
    const opts = result.opts();
    return opts;
}
exports.default = default_1;
