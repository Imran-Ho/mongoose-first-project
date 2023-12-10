import { studentServices } from './student.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';

// catchAsync function. it works as try-catch function.we used it in utility folder.

// get all students
const getAllStudents = catchAsync(async (req, res) => {
  // console.log(req.query);
  const result = await studentServices.getAllStudentsFromDB(req.query);

  // send response.
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

// get single student with id
const getSingleStudentWithID = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await studentServices.getSingleStudentsFromDB(studentID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student',
    data: result,
  });
});

// delete student
const deleteStudentWithID = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await studentServices.deleteSingleStudentsFromDB(studentID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'deleted student successfully',
    data: result,
  });
});
const updateStudentWithID = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentsIntoDB(studentID, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudentWithID,
  deleteStudentWithID,
  updateStudentWithID,
};
