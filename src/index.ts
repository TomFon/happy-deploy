
import config from './lib/initConfig'
import compress from './lib/compress'
import upload from './lib/upload'
import Config from './interface/config'

const start = async function (config:Config) {
  try {
    await compress(config)
    await upload(config)
  } catch (err) {
    console.log(err)
  }
}

start(config)
