import { Schema, model, Model, Document } from 'mongoose';

interface IShowings extends Document {
  id: Schema.Types.ObjectId;
  type: string;
  images: string[];
  description: string;
  fromIssue?: string;
}

const showingsSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    character: {
      type: Schema.Types.ObjectId,
      ref: 'Character'
    },
    images: {
      required: true,
      type: [String]
    },
    description: {
      required: true,
      type: String
    },
    fromIssue: String
  },
  {
    timestamps: true
  }
);

export const Showings: Model<IShowings> = model<IShowings>('Showings', showingsSchema);
