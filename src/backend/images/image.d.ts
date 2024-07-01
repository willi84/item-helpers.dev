import { ERROR_TYPE } from "../index.d";
// export type IMAGE_LOG= {
//     type: ERROR_TYPE,
//     message: string
//     context: any
// }
// export type IMAGE_RESULT = {
//     data: any,
//     log: IMAGE_LOG[]
// }
export type IMAGE_ITEM = {
    id: string,
    url: string,
    lastModified: Date,
    size: string,
    imageUrl: string,
    status: string
}

export type IMAGE_DATA = {
    [key: string]: IMAGE_ITEM
}