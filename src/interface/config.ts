export interface baseConfig {
    host: string,
    port: number,
    username: string,
    password: string,
    localPath: string,
    remotePath: string,
    subdir?: string,
    entry?: string
 }

 interface Config extends baseConfig{
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

export default Config
