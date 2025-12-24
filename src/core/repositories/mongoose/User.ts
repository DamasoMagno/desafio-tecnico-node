import { IUser, User } from "@/infra/database/schema/User";
import { IUserRepository } from "@/infra/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async list(filter: object, skip: number, limit: number): Promise<IUser[]> {
    const users = await User.find(filter).skip(skip).limit(limit);
    return users;
  }

  async findById(id: string) {
    return User.findById(id).select("-password");
  }

  async findByEmail(email: string) {
    return User.findOne({ email }).select("-password");
  }

  async register(data: Partial<IUser>) {
    return User.create(data);
  }

  async update(id: string, data: Partial<IUser>) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
}
