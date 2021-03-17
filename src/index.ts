#!/usr/bin/env node
import initConfig from './utils/init-config'
import compress from './utils/compress'
import upload from './utils/upload'
import parser from './utils/parser'
import verify from './utils/verify'
const run = async function () {
  try {
    // const [, , ...rawArgs] = process.argv
    // analysis process argv
    const parsedArgs = parser()
    return
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
