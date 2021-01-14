export interface BaseConfig {
    host: string,
    port: number,
    username: string,
    password: string,
    localPath: string,
    remotePath: string,
    subdir?: string,
    entry?: string
 }

 interface HappyDeployConfig extends BaseConfig{
    realRemotePath: string,
    realLocalPath: string,
    tmpPath:string,
    isFile: boolean,
    isDirectory: boolean,
    basename: string,
    subdir?: string,
    afterUploadCommand?: string [],
    beforeUploadCommand?: string [],
    extname?: string
}

export default HappyDeployConfig
