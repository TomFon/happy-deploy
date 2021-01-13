interface Command {
    name: string,
    type: typeof String | typeof Boolean,
    alias?: string,
    defaultValue?: string | boolean
    description: string
}

export default Command
