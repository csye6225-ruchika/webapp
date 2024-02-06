import { User } from "../models/User.js";
import { errorLogger } from "../services/LoggerService.js";

export const findUserByUsername = async (username) => {
    try {      
      const user = await User.findOne({
        where: {
          username: username
        }
      });
      return user ? user.toJSON() : null;
    } catch (error) {
      errorLogger.error('Error finding user by username:', error);
      throw error;
    }
  }
  

export const  saveOrUpdateUser = async (userData) => {
    try {
      const [user, created] = await User.upsert(userData, { returning: true });
  
      return user.toJSON();
    } catch (error) {
      console.error('Error saving or updating user:', error);
      throw error;
    }
  }