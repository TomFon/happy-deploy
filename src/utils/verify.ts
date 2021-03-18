import { CoreOption } from '../interface/options'
import { isJsonFile } from './common'
import path from 'path'
import fs, { existsSync } from 'fs'
import { BaseConfig } from '../interface/config'
import { core } from './cli-flag'


export default function (filename:string): BaseConfig|undefined {
  // get args from entry json file
  const entryPath: string = path.join(process.cwd(), filename)
  if (!isJsonFile(entryPath)) {
    throw new Error('the config filename is not json file')
  }
  if (!existsSync(entryPath)) {
    throw new Error('the config filename is not exist')
  }
  try {
    const jsonData:string = fs.readFileSync(entryPath, 'utf-8')
    const configData:BaseConfig = JSON.parse(jsonData)
    // verity opts
    core.forEach((item: CoreOption) => {
      const key: string = item.name
      const required: boolean | undefined = item.required
      const rules: RegExp | undefined = item.rules
      const val = configData[key]
      if (required && (val === '' || val === undefined || val === null)) {
        throw new Error(`${key} is required and the type required ${typeof item.type()}`)
      }
      if (rules && !rules.test(val as string)) {
        throw new Error(`the ${key} RegExp is ${rules}`)
      }
    })
    return configData
  } catch (err) {
    console.log(err)
  }
}
