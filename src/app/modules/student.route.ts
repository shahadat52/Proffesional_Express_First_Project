import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

//router will call controller fn
router.post('/create-student', studentControllers.createStudent);
router.get('/', studentControllers.getStudents);
router.get('/:studentId', studentControllers.getSingleStudent);

export const studentRoutes = router;
