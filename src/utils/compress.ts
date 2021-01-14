
import fs from 'fs'
import archiver from 'archiver'
import Config from '../interface/config'

export default function (config:Config):Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(config.tmpPath)
    const archive = archiver('zip')

    output.on('close', function () {
      const bytes = archive.pointer()
      console.log('total bytes :' + bytes)
      console.log(
        'archiver has been finalized and the output file descriptor has closed.'
      )
      resolve()
    })
    output.on('end', function () {
      console.log('Data has been drained')
    })
    archive.on('error', function (err:Error) {
      reject(err)
    })
    archive.pipe(output)
    // if (config.isDirectory) {
    //   archive.directory(config.realLocalPath, config.inCludeDirectory ? config.basename : false)
    // } else {
    //   archive.append(fs.createReadStream(config.realLocalPath), { name: config.basename })
    // }
    archive.directory(config.realLocalPath, config.subdir ? config.subdir : false)
    archive.finalize()
  })
}
