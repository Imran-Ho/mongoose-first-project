import express from 'express';
import { StudentControllers } from './student.controller';
// import { updateStudentZodValidationSchema } from '../../modules/student/student.zod.validation';
import validationRequest from '../../middlewares/validateRequest';

const router = express.Router();

// will call controller function
// router.post('/create-student', StudentControllers.createStudent);

router.get('/:studentID', StudentControllers.getSingleStudentWithID);

router.patch(
  '/:studentID',
  // validationRequest(updateStudentZodValidationSchema),
  StudentControllers.updateStudentWithID,
);
router.delete('/:studentID', StudentControllers.deleteStudentWithID);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
