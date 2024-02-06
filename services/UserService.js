import { UserAlreadyExists } from "../errors/UserErrors.js";
import { findUserByUsername, saveOrUpdateUser } from "../repositories/UserRepository.js";
import { generateHash } from "./HashService.js";
import { mapUserToUserResponse } from "./mappers/UserMapper.js";


export const createUser = async (userDetails) => {

    const oldUser = await findUserByUsername(userDetails.username)

    if (oldUser != null) {
        throw new UserAlreadyExists()
    }

    userDetails.password = await generateHash(userDetails.password)

    const newUser = await saveOrUpdateUser(userDetails)

    return mapUserToUserResponse(newUser)

}