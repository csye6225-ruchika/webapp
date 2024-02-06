import { errorLogger } from "../services/LoggerService.js"
import { createUser } from "../services/UserService.js"


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
        if (error.name === "UserAlreadyExists") {
            errorLogger.error(error.message)
            return res.status(400).json({ "message": error.message }).end()
        }
        errorLogger.error('Something went wrong, Error: ', error)
        return res.status(500).end()
    }

    
}