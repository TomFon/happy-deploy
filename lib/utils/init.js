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
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = require("fs");
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield inquirer_1.default.prompt([
                {
                    name: 'port',
                    message: 'input your server port',
                    default: '22'
                },
                {
                    name: 'host',
                    message: 'input your server ip address'
                }, {
                    name: 'localPath',
                    message: 'input your upload file local path'
                },
                {
                    name: 'remotePath',
                    message: 'input your upload file remote path'
                },
                {
                    name: 'username',
                    message: 'input your login name'
                }, {
                    name: 'password',
                    message: 'input your login password'
                }
            ]);
            res = Object.assign(Object.assign({}, res), { subdir: '', beforeUploadCommand: '', afterUploadCommand: '' });
            const basename = 'qd';
            let filename = basename + '.json';
            let i = 1;
            while (fs_1.existsSync(filename)) {
                filename = basename + i + '.json';
                i++;
            }
            fs_1.writeFileSync(filename, JSON.stringify(res, null, '\t'));
        }
        catch (err) {
            console.log(err);
            process.exit();
        }
    });
}
exports.default = default_1;
