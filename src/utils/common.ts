import { commands } from './cli-flag'
import path from 'path'
export const packageExists = (packageName: string): boolean => {
  try {
    require(packageName)
    return true
  } catch (err) {
    return false
  }
}
export const isJsonFile = (filePath: string): boolean => {
  return path.extname(filePath).toLocaleLowerCase() === '.json'
}

export const isCommandUsed = (args: string[]): boolean =>
  !!commands.find((cmd) => {
    return args.includes(cmd.name)
  })
