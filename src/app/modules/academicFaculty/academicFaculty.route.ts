import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { academicFacultyValidatin } from './academicFaculty.zodValidation';
import { academicFacultyController } from './academicFaculty.controller';

const router = express.Router();
router.post(
  '/create-academic-faculty',
  validationRequest(
    academicFacultyValidatin.createAcademicFacultyValidatinSchema,
  ),
  academicFacultyController.createAcademicFaculty,
);

// will call controller function
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);
router.get('/', academicFacultyController.getAllAcademicFaculties);
router.patch(
  '/:facultyId',
  validationRequest(
    academicFacultyValidatin.updateAcademicFacultyValidatinSchema,
  ),
  academicFacultyController.updateAcademicFaculty,
);

// router.delete('/:facultyID', StudentControllers.deleteStudentWithID);

export const AcademicFacultyRoutes = router;
