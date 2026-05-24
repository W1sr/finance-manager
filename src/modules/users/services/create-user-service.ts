import bcrypt from "bcrypt";

import { UserRepository } from "../repositories/user-repository";
import { CreateUserDTO } from "../validators/create-user-schema";

export class CreateUserService {
  constructor(private userRepository = new UserRepository()) {}

  async execute(data: CreateUserDTO) {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      data.email,
    );

    if (emailAlreadyExists) {
      throw new Error("Email já cadastrado");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    return user;
  }
}
