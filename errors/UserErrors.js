

export class UserAlreadyExists extends Error {
    get message() {
        return "User already exists"
    }
    get name() {
        return "UserAlreadyExists"
    }
    get statusCode() {
        return 400
    }
}