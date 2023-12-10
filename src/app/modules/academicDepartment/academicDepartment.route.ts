import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidatin } from './academicDepartment.zodValidation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();
router.post(
  '/create-academic-department',
  validationRequest(
    academicDepartmentValidatin.createAcademicDepartmentValidatinSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
);

// will call controller function
router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);
router.get('/', academicDepartmentController.getAllAcademicDepartments);
router.patch(
  '/:departmentId',
  validationRequest(
    academicDepartmentValidatin.updateAcademicDepartmentValidatinSchema,
  ),
  academicDepartmentController.updateAcademicDepartment,
);

// router.delete('/:facultyID', StudentControllers.deleteStudentWithID);

export const AcademicDepartmentRoutes = router;
