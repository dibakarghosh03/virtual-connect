import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createConference, joinConference } from '../controllers/conferenceController';

const conferenceRouter = Router();

conferenceRouter.post('/create', authMiddleware, createConference);
conferenceRouter.post('/join', authMiddleware, joinConference);

export default conferenceRouter;