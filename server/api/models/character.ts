import { Schema, model, Model, Document } from 'mongoose';

interface ICharacter extends Document {
  name: string;
  alias: string;
  abilities: string[];
  powerLevel: string;
  avatarUrl?: string;
  publisher: string;
  showings?: object[];
}

const characterSchema = new Schema(
  {
    name: { required: true, type: String },
    alias: { required: true, type: String },
    abilities: { required: true, type: [String] },
    powerLevel: { required: true, type: String },
    avatarUrl: { required: true, type: String },
    publisher: { required: true, type: String },
    showings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Showings'
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Character: Model<ICharacter> = model<ICharacter>('Character', characterSchema);
