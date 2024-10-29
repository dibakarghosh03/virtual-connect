import mongoose, { Schema, Document, Types } from "mongoose";

export interface IConference extends Document {
    participants: Types.ObjectId[];
    createdAt: Date;
}

const conferenceSchema: Schema<IConference> = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 6 * 60 * 60,
    }
});

const Conference = mongoose.model<IConference>('Conference', conferenceSchema);

export default Conference;