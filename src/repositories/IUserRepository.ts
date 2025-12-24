import { IUser } from "../database/schema/User";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  register(data: Partial<IUser>): Promise<IUser>;
  update(id: string, data: Partial<IUser>): Promise<IUser | null>;
  list(filter: object, skip: number, limit: number): Promise<IUser[]>;
  fincByEmail(email: string): Promise<IUser | null>;
}
