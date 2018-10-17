import { Schema, model, Model, Document } from 'mongoose';

interface IShowings extends Document {
  type: string;
  images: string[];
  description: string;
  fromIssue?: string;
}

const showingsSchema = new Schema(
  {
    character: {
      type: Schema.Types.ObjectId,
      ref: 'Character'
    },
    images: { required: true, type: [String] },
    description: { required: true, type: String },
    fromIssue: String
  },
  {
    timestamps: true
  }
);

export const Showings: Model<IShowings> = model<IShowings>('Showings', showingsSchema);
