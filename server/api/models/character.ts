import { Schema, model, Model, Document } from 'mongoose';

interface ICharacter extends Document {
  name: string;
  alias: string;
  abilities: string[];
  powerLevel: string;
  avatarUrl?: string;
  publisher: string;
  showings?: object[];
  description: string;
}

const characterSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true
    },
    alias: { 
      required: true, 
      type: String 
    },
    abilities: { 
      required: true, 
      type: [String] 
    },
    powerLevel: { 
      required: true, 
      type: String 
    },
    avatarUrl: { 
      required: false, 
      type: String 
    },
    publisher: { 
      required: true, 
      type: String
     },
     description: {
       required: false,
       type: String,
       default: 'N/A'
     }
  },
  {
    timestamps: true
  }
);

export const Character: Model<ICharacter> = model<ICharacter>('Character', characterSchema);
