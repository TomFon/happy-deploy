
import commander from 'commander'
import { BaseConfig } from '../interface/config'
import Command from '../interface/command'
import utils from './utils'
import path from 'path'
import { existsSync } from 'fs'

const parser = new commander.Command()
const core:Command[] = [
  {
    name: 'entry',
    type: String,
    defaultValue: 'ltf.json',
    description: 'the config file of your application'
  },
  {
    name: 'host',
    type: String,
    description: 'server ip address'
  },
  {
    name: 'port',
    type: String,
    defaultValue: '22',
    description: 'server port'
  },
  {
    name: 'username',
    type: String,
    alias: 'u',
    description: 'server username'
  },
  {
    name: 'password',
    type: String,
    alias: 'p',
    description: 'server password'
  },
  {
    name: 'localPath',
    type: String,
    alias: 'l',
    description: 'local file path'
  },
  {
    name: 'remotePath',
    type: String,
    alias: 'r',
    description: 'remote file path'
  },
  {
    name: 'subdir',
    alias: 'd',
    type: String,
    defaultValue: '',
    description: 'zip file subdir'
  }
]

core.reduce((parserInstance, option) => {
  const flags = option.alias ? `-${option.alias}, --${option.name} <value>` : `--${option.name} <value>`
  parserInstance.option(flags, option.description, option.type, option.defaultValue)
  return parserInstance
}, parser)

parser.parse(process.argv)

let opts = parser.opts()

// clean opts undefine value
for (const key in opts) {
  if (opts[key] === undefined) {
    delete opts[key]
  }
}
let entryJson:{
  [key:string] : string | boolean
} = opts

// get args from json file
if (opts.entry) {
  const entryPath:string = path.join(process.cwd(), opts.entry)
  console.log(utils.isJsonFile(entryPath), existsSync(entryPath))
  if (utils.isJsonFile(entryPath) && existsSync(entryPath)) {
    entryJson = { ...require(entryPath), ...entryJson }
    opts = entryJson
  }
}
// vertry opts
core.forEach((item: Command) => {
  const key:string = item.name
  if (entryJson[key] === undefined || entryJson[key].constructor !== item.type) {
    throw new Error(`${key} is required and the type required ${typeof item.type()}`)
  }
})

export default opts as BaseConfig
