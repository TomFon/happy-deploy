



## Description
happy-deploy helps you deploy quickly


## Installation
```bash
npm i happy-deploy
```

## Usage

```bash
hd init
```
after hd init,it will create config json(hd.json) in your current terminal path

```bash
hd run
```
hd run, it will upload your file to your server
and the config's filename is hd.json, you can change by hd run -c newDd.json

## Options

```json
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
}
```