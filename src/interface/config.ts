 interface Config {
    host: string,
    port: number,
    username: string,
    password: string,
    localPath: string,
    remotePath: string,
    realRemotePath: string,
    realLocalPath: string,
    tmpPath:string,
    isFile: boolean,
    isDirectory: boolean,
    basename: string,
    inCludeDirectory?: boolean,
    afterUploadCommand?: string [],
    beforeUploadCommand?: string [],
    extname?: string
}

export default Config
