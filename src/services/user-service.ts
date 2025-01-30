import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { mailService } from "./mail-service";
import { tokenService } from "./token-service";
import { UserDto } from "../dtos/user-dto";

class Service {
  async register(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error("Пользователь уже существует");
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const activationLink = v4();

    // const user = await UserModel.create({
    //   email,
    //   password: hashPassword,
    //   activationLink,
    // });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/activate/${activationLink}`
    );
    // const userDto = new UserDto(user);
    // const tokens = tokenService.generateTokens({ ...userDto });

    // await tokenService.saveToken(userDto.id, tokens.refreshToken);
    // return { ...tokens, user: userDto };
    return { sussecc: "sdf" };
  }
}

export const UserService = new Service();
