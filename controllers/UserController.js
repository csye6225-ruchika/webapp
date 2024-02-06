import { ERROR_USER_ALREADY_EXISTS } from "../errors/UserErrors.js"
import { errorLogger } from "../services/LoggerService.js"
import { createUser } from "../services/UserService.js"
import { mapUserToUserResponse } from "../services/mappers/UserMapper.js"


export const createAUser = async(req, res) => {

    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        username: req.body.username
    }

    try {
        const user = await createUser(newUser)
        return res.status(201).json(user).end()
    } catch (error) {
        if (error.name === ERROR_USER_ALREADY_EXISTS) {
            errorLogger.error(error.message)
            return res.status(error.statusCode).json({ "message": error.message }).end()
        }
        errorLogger.error('Internal Server Error: Something went wrong\nError: ', error)
        return res.status(500).json({ message: "Something went wrong"}).end()
    }
    
}

export const getSelfUserDetails = async(req, res, next) => {
    if (req.user) {
        return res.status(200).json(mapUserToUserResponse(req.user)).end()
    } else {
        errorLogger.error('Internal Server Error: Something went wrong\nError: ', error)
        return res.status(500).json({ message: "Something went wrong"}).end()
    }
    
}

export const updateSelfUserDetails = async(req, res, next) => {
    
    return res.status(200).end()
}