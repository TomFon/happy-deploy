import { join, posix, dirname } from 'path'
import { existsSync, mkdirSync } from 'fs'
import HappyDeployConfig, { BaseConfig } from '../interface/config'
export default function (option:BaseConfig):HappyDeployConfig {
  const tmpFileName = 'release-package.zip'
  const config:HappyDeployConfig = {
    ...option,
    zipPath: '',
    absLocalPath: '',
    tmpPath: join(__dirname, '../../tmp/' + tmpFileName)
  }
  // mkdir tmp directory
  if (!existsSync(config.tmpPath)) {
    mkdirSync(dirname(config.tmpPath))
  }
  // absolute path
  config.absLocalPath = join(process.cwd(), config.localPath)
  config.zipPath = posix.join(config.remotePath, tmpFileName)

  if (!existsSync(config.absLocalPath)) {
    throw new Error('localPath does not exist')
  }
  return config
}
