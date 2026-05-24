import { prisma } from "@/lib/prisma";
import { string } from "zod";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: { name: string; email: string; passwordHash: string }) {
    return prisma.user.create({
      data,
    });
  }
}
