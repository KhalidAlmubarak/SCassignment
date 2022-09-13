import User from "./user.model";
import { IUser } from "./user.interface";
class UserService {
  async findUserByEmail(email: string) {
    return User.findOne({
      email: email,
    }).exec();
  }

  async updateUserProfile(age: number,major: string, isGraduate:boolean, email:string) {
    
    return User.updateOne({
      email: email,
      
    },
    {
      age: age,
      major:major,
      isGraduate:isGraduate
    }).exec();
  }

  async getUserProfile(email: string) {
    return User.findOne({
      email: email,
    }).exec();
  }
}

export default new UserService();
