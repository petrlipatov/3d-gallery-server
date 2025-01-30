import { UserService } from "../services/user-service";

class Controller {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await UserService.register(email, password);

      // res.cookie("refreshToken", userData.refreshToken, {
      //   httpOnly: true,
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      // });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
  async login(req, res, next) {
    try {
    } catch (err) {}
  }
  async logout(req, res, next) {
    try {
    } catch (err) {}
  }
  async activate(req, res, next) {
    try {
    } catch (err) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (err) {}
  }
  async getUsers(req, res, next) {
    try {
      res.json(["test responese"]);
    } catch (err) {}
  }
}

export const UserController = new Controller();
