export interface BaseConfig {
    host: string,
    port: number,
    username: string,
    password: string,
    localPath: string,
    remotePath: string,
    subdir?: string,
    afterUploadCommand?: string [],
    beforeUploadCommand?: string [],
 }

 interface HappyDeployConfig extends BaseConfig{
    zipPath: string,
    absLocalPath: string,
    tmpPath: string

}

export default HappyDeployConfig
