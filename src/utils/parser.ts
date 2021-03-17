
import { BaseConfig } from '../interface/config'
// import { commands } from './cli-flag'
import yargs from 'yargs'

export default function ():BaseConfig {
  const argv = yargs.argv
  console.log(argv)
  return {} as BaseConfig
}
