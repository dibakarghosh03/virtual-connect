import { Request, Response } from "express";
import Conference from "../models/Conference";


export const createConference = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body.user.id;
        const newConference = await Conference.create({participants: userId});

        if(!newConference) {
            res.status(400).json({
                success: false,
                message: "Failed to create conference"
            });
            return;
        }

        res.status(201).json({
            success: true,
            message: "Conference created successfully",
            channelName: newConference._id
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while creating conference"
        });
    }
}

export const joinConference = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body.user.id;
        const conferenceId = req.body.channelName;
        const conference = await Conference.findById(conferenceId);

        if(!conference) {
            res.status(404).json({
                success: false,
                message: "Conference not found"
            });
            return;
        }

        if(conference.participants.includes(userId)) {
            res.status(200).json({
                success: true,
                message: "Already joined conference"
            })
            return;
        }

        conference.participants.push(userId);
        await conference.save();

        res.status(200).json({
            success: true,
            message: "Joined conference successfully"
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while joining conference"
        });
        return;
    }
}