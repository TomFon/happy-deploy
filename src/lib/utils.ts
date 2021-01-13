
import path from 'path'

export default {
  packageExists: (packageName: string):boolean => {
    try {
      require(packageName)
      return true
    } catch (err) {
      return false
    }
  },
  isJsonFile: (filePath: string):boolean => {
    return path.extname(filePath).toLocaleLowerCase() === '.json'
  }
}
