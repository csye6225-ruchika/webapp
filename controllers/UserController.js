import { POSTGRESQLDB_CONNECTION_REFUSED } from "../errors/CommonError.js";
import {
  ERROR_USER_ALREADY_EXISTS,
  ERROR_USER_FROM_REQUEST_NOT_FOUND,
} from "../errors/UserError.js";
import { errorLogger } from "../services/LoggerService.js";
import {
  createANewUser,
  getSelfUser,
  updateSelfUser,
} from "../services/UserService.js";

export const createAUser = async (req, res) => {
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    username: req.body.username,
  };

  try {
    const user = await createANewUser(newUser);
    return res.status(201).json(user).end();
  } catch (error) {
    if (error.name == POSTGRESQLDB_CONNECTION_REFUSED) {
      errorLogger.error("Service Unavailable: Error:\n", error);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_ALREADY_EXISTS) {
      errorLogger.error(error.message);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    errorLogger.error(
      "Internal Server Error: Something went wrong\nError: ",
      error
    );
    return res.status(500).json({ message: "Something went wrong" }).end();
  }
};

export const getSelfUserDetails = async (req, res) => {
  try {
    return res.status(200).json(getSelfUser(req.user)).end();
  } catch (error) {
    if (error.name == POSTGRESQLDB_CONNECTION_REFUSED) {
      errorLogger.error("Service Unavailable: Error:\n", error);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_FROM_REQUEST_NOT_FOUND) {
      errorLogger.error(error.message);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    errorLogger.error(
      "Internal Server Error: Something went wrong\nError: ",
      error
    );
    return res.status(500).json({ message: "Something went wrong" }).end();
  }
};

export const updateSelfUserDetails = async (req, res, next) => {
  try {
    await updateSelfUser(req.user, req.body);
    return res.status(204).end();
  } catch (error) {
    if (error.name == POSTGRESQLDB_CONNECTION_REFUSED) {
      errorLogger.error("Service Unavailable: Error:\n", error);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_FROM_REQUEST_NOT_FOUND) {
      errorLogger.error(error.message);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    errorLogger.error(
      "Internal Server Error: Something went wrong\nError: ",
      error
    );
    return res.status(500).json({ message: "Something went wrong" }).end();
  }
};
