import { AppError } from "../AppError";

export type Result<T> = 
    | { success: true, data?: T }
    | { success: false, error: AppError }

