import express from 'express';
import { semesterRegistrationCollections } from './semesterRegistration.collection';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  semesterRegistrationCollections.createSemesterRegistration,
);
router.get('/', semesterRegistrationCollections.getAllSemesterRegistration);
router.get(
  '/:semesterRegistration',
  semesterRegistrationCollections.getSingleSemesterRegistration,
);

router.patch(
  '/:semesterRegistration',
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidation,
  ),
  semesterRegistrationCollections.updateSemesterRegistration,
);

export const semesterRegistration = router;
