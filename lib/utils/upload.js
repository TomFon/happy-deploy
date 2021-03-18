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
Object.defineProperty(exports, "__esModule", { value: true });
const ssh2_1 = require("ssh2");
const conn = new ssh2_1.Client();
const exec = function (conn, commandList) {
    return new Promise((resolve, reject) => {
        let command = '';
        if (typeof commandList === 'string') {
            command = commandList;
        }
        else if (Array.isArray(commandList)) {
            command = commandList.join(' && ');
        }
        conn.exec(command, (err, stream) => {
            if (err) {
                reject(err);
            }
            else {
                stream
                    .on('close', () => {
                    resolve();
                })
                    .on('data', (data) => {
                    console.log('STDOUT:\n' + data);
                })
                    .stderr.on('data', (data) => {
                    reject(data.toString());
                });
            }
        });
    });
};
const sftp = function (conn, localPath, remotePath) {
    return new Promise((resolve, reject) => {
        conn.sftp(function (err, sftp) {
            if (err) {
                reject(err);
            }
            else {
                sftp.fastPut(localPath, remotePath, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
};
function default_1(config) {
    return new Promise((resolve, reject) => {
        conn.on('ready', function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('connect ready');
                try {
                    if (Array.isArray(config.beforeUploadCommand)) {
                        yield exec(conn, config.beforeUploadCommand);
                    }
                    yield exec(conn, `if [ ! -e ${config.remotePath}  ];then  mkdir ${config.remotePath} && echo mkdir ${config.remotePath}; fi`);
                    yield sftp(conn, config.tmpPath, config.zipPath);
                    yield exec(conn, [`unzip -o ${config.zipPath} -d ${config.remotePath}`, `rm ${config.zipPath}`
                    ]);
                    if (Array.isArray(config.afterUploadCommand)) {
                        yield exec(conn, config.afterUploadCommand);
                    }
                    resolve();
                    conn.end();
                }
                catch (err) {
                    reject(err);
                }
            });
        })
            .on('error', function (err) {
            reject(err);
        })
            .on('end', function () {
            console.log('connect end!');
        })
            .on('close', function () {
            console.log('connect close');
        })
            .connect({
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password
        });
    });
}
exports.default = default_1;
