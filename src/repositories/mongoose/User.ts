import { IUser, User } from "../../database/schema/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository {
  async list(filter: object, skip: number, limit: number): Promise<IUser[]> {
    const users = await User.find(filter).skip(skip).limit(limit);
    return users;
  }

  async findById(id: string) {
    return User.findById(id).select("-password");
  }

  async fincByEmail(email: string) {
    console.log(email);
    return User.findOne({ email }).select("-password");
  }

  async register(data: Partial<IUser>) {
    return User.create(data);
  }

  async update(id: string, data: Partial<IUser>) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
}
