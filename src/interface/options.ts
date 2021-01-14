
export interface CoreOption {
    name: string,
    type: typeof String | typeof Boolean,
    alias?: string,
    defaultValue?: string | boolean
    description: string,
    rules?:RegExp,
    required?: boolean
}

export interface CommandOption extends CoreOption {
    usage: string
}
