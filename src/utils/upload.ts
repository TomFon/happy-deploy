import { Client } from 'ssh2'
import Config from '../interface/config'
const conn:Client = new Client()

const exec = function (conn:Client, commandList: string [] | string) {
  return new Promise<void>((resolve, reject) => {
    let command = ''
    if (typeof commandList === 'string') {
      command = commandList
    } else if (Array.isArray(commandList)) {
      command = commandList.join(' && ')
    }
    conn.exec(command, (err, stream) => {
      if (err) {
        reject(err)
      } else {
        stream
          .on('close', () => {
            resolve()
          })
          .on('data', (data: string) => {
            console.log('STDOUT:\n' + data)
          })
          .stderr.on('data', (data) => {
            reject(data.toString())
          })
      }
    })
  })
}
const sftp = function (conn:Client, localPath:string, remotePath:string) {
  return new Promise<void>((resolve, reject) => {
    conn.sftp(function (err, sftp) {
      if (err) {
        reject(err)
      } else {
        sftp.fastPut(localPath, remotePath, (err:Error):void => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }
    })
  })
}

export default function (config: Config):Promise<void> {
  return new Promise<void>((resolve, reject) => {
    conn.on('ready', async function () {
      console.log('connect ready')
      try {
        if (Array.isArray(config.beforeUploadCommand)) {
          await exec(conn, config.beforeUploadCommand)
        }
        await exec(conn, `if [ ! -e ${config.remotePath}  ];then  mkdir ${config.remotePath} && echo mkdir ${config.remotePath}; fi`)
        await sftp(conn, config.tmpPath, config.zipPath)
        await exec(conn, [`unzip -o ${config.zipPath} -d ${config.remotePath}`, `rm ${config.zipPath}`
        ])
        if (Array.isArray(config.afterUploadCommand)) {
          await exec(conn, config.afterUploadCommand)
        }
        resolve()
        conn.end()
      } catch (err) {
        reject(err)
      }
    })
      .on('error', function (err) {
        reject(err)
      })
      .on('end', function () {
        console.log('connect end!')
      })
      .on('close', function () {
        console.log('connect close')
      })
      .connect({
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password
      })
  })
}
