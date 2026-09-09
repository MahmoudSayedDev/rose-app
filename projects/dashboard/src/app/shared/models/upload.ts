export interface UploadRes {
    status: boolean
    code: number
    payload: Payload
}

export interface Payload {
    url: string
}