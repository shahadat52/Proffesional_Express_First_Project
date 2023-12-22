import express from 'express';
import { authCollections } from './auth.collection';
import validateRequest from '../../middlewares/validateRequest';
import { authValidationSchemas } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post('/login', authCollections.login);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(authValidationSchemas.updatePasswordValidationSchema),
  authCollections.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(authValidationSchemas.refreshTokenValidationSchema),
  authCollections.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(authValidationSchemas.forgetPasswordValidationSchema),
  authCollections.forgetPassword,
);

export const authRouter = router;
