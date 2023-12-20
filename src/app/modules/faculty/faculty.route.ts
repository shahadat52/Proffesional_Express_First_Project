import express from 'express';
import { facultiesController } from './faculty.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/create-faculty');
router.get('/', auth(), facultiesController.getAllFaculties);

export const facultiesRouters = router;
