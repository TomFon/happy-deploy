#!/usr/bin/env node
import initConfig from './utils/init-config'
import compress from './utils/compress'
import upload from './utils/upload'
import parser from './utils/parser'
import { isCommandUsed } from './utils/common'
import verify from './utils/verify'
const run = async function () {
  try {
    const [, , ...rawArgs] = process.argv
    // analysis process argv
    const parsedArgs = parser(rawArgs)
    // cli command
    const commandIsUsed = isCommandUsed(rawArgs)
    if (commandIsUsed) {
      return
    }
    verify(parsedArgs)
    const happyDeployConfig = initConfig(parsedArgs)
    console.log(happyDeployConfig)
    await compress(happyDeployConfig)
    await upload(happyDeployConfig)
  } catch (err) {
    console.log(err)
  }
}

run()
