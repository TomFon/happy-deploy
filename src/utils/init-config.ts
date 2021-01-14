import { join, posix, basename, extname } from 'path'
import { existsSync, lstatSync } from 'fs'
import HappyDeployConfig, { BaseConfig } from '../interface/config'

export default function (option:BaseConfig):HappyDeployConfig {
  const config:HappyDeployConfig = {
    ...option,
    isFile: false,
    isDirectory: false,
    basename: '',
    realRemotePath: '',
    realLocalPath: '',
    tmpPath: join(__dirname, '../../tmp/release-package.zip')
  }
  // absolute path
  config.realLocalPath = join(process.cwd(), config.localPath)

  config.realRemotePath = posix.join(config.remotePath, 'release-package.zip')

  if (existsSync(config.realLocalPath)) {
    const stat = lstatSync(config.realLocalPath)
    config.isFile = stat.isFile()
    config.isDirectory = stat.isDirectory()
    config.basename = basename(config.realLocalPath)
    config.extname = extname(config.realLocalPath)
  } else {
    throw new Error('localPath does not exist')
  }
  return config
}
