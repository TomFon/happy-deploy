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
const init_config_1 = __importDefault(require("./init-config"));
const compress_1 = __importDefault(require("./compress"));
const upload_1 = __importDefault(require("./upload"));
const verify_1 = __importDefault(require("./verify"));
function default_1(configName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const baseConfig = verify_1.default(configName);
            if (baseConfig) {
                const wholeConfig = init_config_1.default(baseConfig);
                yield compress_1.default(wholeConfig);
                yield upload_1.default(wholeConfig);
            }
        }
        catch (err) {
            console.log(err);
            process.exit();
        }
    });
}
exports.default = default_1;
