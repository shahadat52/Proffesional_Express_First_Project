import express from 'express';
import { facultiesController } from './faculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post('/create-faculty');
router.get('/', auth(USER_ROLE.admin), facultiesController.getAllFaculties);

export const facultiesRouters = router;
