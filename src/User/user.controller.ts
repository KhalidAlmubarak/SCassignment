import { Request, Response, NextFunction } from "express";
import UserService from "./user.service";
class UserController {
  constructor() {}

  async getUser(req: any, res: Response, next: NextFunction) {
    const email = req.user.email;
    try {
      const user = await UserService.findUserByEmail(email);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }


  async updateUser(req: any, res: Response, next: NextFunction) {
    const email = req.user.email;
    const age = req.body.age;
    const major = req.body.major;
    const isGraduate = req.body.isGraduate;

    try {
      const user = await UserService.updateUserProfile(age, major,isGraduate,email);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

}

export default new UserController();
