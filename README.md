



## Description
quick-deploy helps you deploy quickly


## Installation
```bash
npm i quick-deploy
```

## Usage

```bash
qd init
```
after qd init,it will create config json(qd.json) in your current terminal path

```bash
qd run
```
qd run, it will upload your file to your server
and the config's filename is qd.json, you can change by qd run -c newDd.json

## Options

```js
{
    "port": "22", // server port
    "host": "",  // server ip
    "localPath": "/ltf/",  //  Local file path
    "remotePath": "",  // deployment path
    "username": "",  // login name
    "password": "", // login password
    "subdir": "new-subdir", // append files from a ltf and naming it `new-subdir` within the archive
    "beforeUploadCommand": ["ls"], // shell command before upload
    "afterUploadCommand": ["ls"] // shell command after finsish upload
}
```