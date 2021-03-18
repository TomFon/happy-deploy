#!/usr/bin/env node

import yargs from 'yargs'
import run from './utils/run'
import init from './utils/init'
// eslint-disable-next-line no-unused-expressions
yargs
  .option('config', {
    alias: 'c',
    describe: 'upload file config',
    default: 'hd.json'
  })
  .command(
    'run',
    'start upload file',
    function (yargs) {
      return yargs
    },
    function (argv) {
      run(argv.config)
    }
  ).command(
    'init',
    'init config file',
    function (yargs) {
      return yargs
    },
    function () {
      console.log('22')
      init()
    }
  )
  .help()
  .argv
