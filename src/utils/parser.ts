
import commander from 'commander'
import { BaseConfig } from '../interface/config'
import { commands, core } from './cli-flag'

export default function (args: string[]):BaseConfig {
  const parser = new commander.Command()
  parser.name('hd').usage('[command] [options]')
  // cli command
  console.log(args)
  commands.reduce((parserInstance, cmd) => {
    parserInstance
      .command(cmd.name)
      .description(cmd.description)
      .usage(cmd.usage)
      .allowUnknownOption(true)
      .action(async () => {
        console.log('action')
      })
    return parserInstance
  }, parser)

  // cli options
  core.reduce((parserInstance, option) => {
    const flags = option.alias ? `-${option.alias}, --${option.name} <value>` : `--${option.name} <value>`
    parserInstance.option(flags, option.description, option.type, option.defaultValue)
    return parserInstance
  }, parser)

  const result = parser.parse(args, { from: 'user' })

  // get argv
  const opts = result.opts()

  return opts as BaseConfig
}
