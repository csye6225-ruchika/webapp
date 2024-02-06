import { UserAlreadyExists } from "../errors/UserErrors.js";
import { User } from "../models/User.js";
import { findUserByUsername, saveOrUpdateUser } from "../repositories/UserRepository.js";
import { generateHash } from "./HashService.js";


export const createUser = async (userDetails) => {

    const oldUser = await findUserByUsername(userDetails.username)

    if (oldUser != null) {
        throw new UserAlreadyExists()
    }

    const hashedPassword = await generateHash(userDetails.password)

    userDetails.password = hashedPassword

    const user = await saveOrUpdateUser(userDetails)

    let newUser = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        account_created: user.account_created,
        account_updated: user.account_updated
    }

    return newUser;

}