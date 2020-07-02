import { File } from "../entities";

export const getFileExt = (name: string) => name.split(".").pop();

const sumFileSize = (size: number, item: File) => size + (item?.size || 0)

export const sumFileSizes = (files: File[]) => files.reduce(sumFileSize, 0)
