import { Schema, model, Model, Document } from 'mongoose';

interface ICharacter extends Document {
  id: Schema.Types.ObjectId;
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
    id: Schema.Types.ObjectId,
    name: String,
    alias: String,
    abilities: [String],
    powerLevel: String,
    avatarUrl: String,
    publisher: String,
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
