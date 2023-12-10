import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();
router.post(
  '/create-academic-semester',
  validationRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);

// will call controller function
router.get(
  '/:semesterId',
  academicSemesterController.getSingleAcademicSemester,
);
router.get('/', academicSemesterController.getAllAcademicSemester);
router.patch(
  '/:semesterId',
  validationRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemester,
);

// router.delete('/:studentID', StudentControllers.deleteStudentWithID);

export const AcademicSemesterRoutes = router;
