
import commander from 'commander'
import { baseConfig } from '../interface/config'
import utils from './utils'
import path from 'path'
const parser = new commander.Command()
const core = [
  {
    name: 'entry',
    type: String,
    alias: null,
    defaultValue: path.join(process.cwd(), 'ltf.json'),
    description: 'the config file of your application'
  },
  {
    name: 'host',
    type: String,
    alias: null,
    description: 'server ip address'
  },
  {
    name: 'port',
    type: String,
    alias: null,
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
    description: 'zip file subdir'
  }
]
core.reduce((parserInstance, option) => {
  const flags = option.alias ? `-${option.alias}, --${option.name} <value>` : `--${option.name} <value>`
  parserInstance.option(flags, option.description, option.type, option.defaultValue)
  return parserInstance
}, parser)
parser.parse(process.argv)

let entryJson = {}
const opts = parser.opts()

for (const key in opts) {
  if (opts[key] === undefined) {
    delete opts[key]
  }
}

if (opts.entry) {
  const entryPath:string = path.join(process.cwd(), opts.entry)
  if (utils.packageExists(entryPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    entryJson = require(entryPath)
    entryJson = { ...entryJson, ...opts }
  }
}

export default entryJson as baseConfig
