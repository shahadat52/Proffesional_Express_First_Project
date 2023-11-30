import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

//router will call controller fn
router.get('/', studentControllers.getStudents);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deleteStudent);
router.patch('/', studentControllers.updateStudentContactNo);

export const studentRoutes = router;
