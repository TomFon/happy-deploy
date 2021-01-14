import { CoreOption } from '../interface/options'
import { isJsonFile } from './common'
import path from 'path'
import { existsSync } from 'fs'
import { core } from './cli-flag'
import { BaseConfig } from '../interface/config'

export default function (opts: BaseConfig):BaseConfig {
  // clean opts undefine value
  for (const key in opts) {
    if (opts[key] === undefined) {
      delete opts[key]
    }
  }

  // get args from entry json file
  if (opts.entry) {
    const entryPath:string = path.join(process.cwd(), opts.entry)
    if (isJsonFile(entryPath) && existsSync(entryPath)) {
      opts = { ...require(entryPath), ...opts }
    }
  }
  // vertry opts
  core.forEach((item: CoreOption) => {
    const key:string = item.name
    const required:boolean | undefined = item.required
    const rules:RegExp | undefined = item.rules
    const val = opts[key]
    if (required && (val === '' || val === undefined || val === null)) {
      throw new Error(`${key} is required and the type required ${typeof item.type()}`)
    }
    if (rules && !rules.test(val as string)) {
      throw new Error(`the ${key} RegExp is ${rules}`)
    }
  })
  return opts
}
