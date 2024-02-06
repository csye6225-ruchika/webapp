
export const ERROR_USER_ALREADY_EXISTS = "UserAlreadyExists";

export class UserAlreadyExists extends Error {
    get message() {
        return "User already exists"
    }
    get name() {
        return ERROR_USER_ALREADY_EXISTS
    }
    get statusCode() {
        return 400
    }
}