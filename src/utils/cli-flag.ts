import { CoreOption, CommandOption } from '../interface/options'

export const commands:CommandOption [] = [
  {
    name: 'init',
    type: String,
    usage: 'init',
    description: 'Initialize a new configuration'
  },
  {
    name: 'run',
    type: String,
    usage: 'run',
    description: 'start upload file'
  }
]
export const core:CoreOption[] = [
  {
    name: 'host',
    type: String,
    required: true,
    description: 'server ip address'
  },
  {
    name: 'port',
    type: String,
    defaultValue: '22',
    required: true,
    description: 'server port'
  },
  {
    name: 'username',
    type: String,
    alias: 'u',
    required: true,
    description: 'server username'
  },
  {
    name: 'password',
    type: String,
    alias: 'p',
    required: true,
    description: 'server password'
  },
  {
    name: 'localPath',
    type: String,
    alias: 'l',
    required: true,
    description: 'local file path'
  },
  {
    name: 'remotePath',
    type: String,
    alias: 'r',
    required: true,
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
