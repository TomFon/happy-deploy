import initConfig from './init-config'
import compress from './compress'
import upload from './upload'
import verity from './verify'
export default async function (configName: string):Promise<void> {
  try {
    const baseConfig = verity(configName)
    if (baseConfig) {
      const wholeConfig = initConfig(baseConfig)
      await compress(wholeConfig)
      await upload(wholeConfig)
    }
  } catch (err) {
    console.log(err)
    process.exit()
  }
}
