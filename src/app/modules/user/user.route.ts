import express from 'express';
import { userController } from './user.controller';

import { studentValidations } from '../student/student.zod.validation';
import validationRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validationRequest(studentValidations.createStudentZodValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
