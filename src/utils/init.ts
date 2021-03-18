
import inquirer from 'inquirer'
import { writeFileSync, existsSync } from 'fs'

export default async function ():Promise<void> {
  try {
    let res = await inquirer.prompt([
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
    ])
    res = { ...res, subdir: '', beforeUploadCommand: '', afterUploadCommand: '' }
    const basename = 'qd'
    let filename = basename + '.json'
    let i = 1
    while (existsSync(filename)) {
      filename = basename + i + '.json'
      i++
    }
    writeFileSync(filename, JSON.stringify(res, null, '\t'))
  } catch (err) {
    console.log(err)
    process.exit()
  }
}
