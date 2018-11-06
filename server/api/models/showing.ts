import { Schema, model, Model, Document } from 'mongoose';

interface IShowing extends Document {
  type: string;
  images: string[];
  description: string;
  fromIssue?: string;
}

const showingSchema = new Schema(
  {
    character: {
      type: Schema.Types.ObjectId,
      ref: 'Character',
      required: true
    },
    images: { 
      required: true,
      type: [String]
     },
    description: { 
      required: true, 
      type: String 
    },
    fromIssue: {
      type: String,
      default: 'N/A'
    }
  },
  {
    timestamps: true
  }
);

export const Showing: Model<IShowing> = model<IShowing>('Showing', showingSchema);
