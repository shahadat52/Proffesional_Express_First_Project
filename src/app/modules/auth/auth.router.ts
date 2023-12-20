import express from 'express';
import { authCollections } from './auth.collection';
const router = express.Router();

router.post('/login', authCollections.login)

export const authRouter = router