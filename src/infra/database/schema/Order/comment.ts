import { Schema } from "mongoose";

export interface IComment {
  content: string;
  createdAt: Date;
}

export const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
